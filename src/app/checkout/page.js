"use client";

import { useCart } from "../../context/cart.js";
import { useRouter } from "next/navigation";
import { placeOrder, getCart } from "../../lib/inventory.js";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const { cart, setCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        getCart().then(setCart);
    }, []);

    const totalPrice = cart.products?.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleConfirmCheckout = async () => {
        try {
            const payload = {
                cart_id: cart._id,
            };
            await placeOrder(payload);
            toast.success("Order placed successfully!");
        } catch (error) {
            console.log(error);
        } finally {
            setCart({});
            router.push("/");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Checkout</h1>

            {cart.products?.length === 0 ? (
                <p>Your cart is empty. Please add items to your cart.</p>
            ) : (
                <div>
                    <div className="space-y-4">
                        {cart.products?.map((item) => (
                            <div key={item.id} className="flex justify-between">
                                <span>
                                    {item.name} (x{item.quantity})
                                </span>
                                <span>₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-right font-bold">
                        <p>Total: ${totalPrice}</p>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button onClick={handleConfirmCheckout} className="bg-green-500 text-white px-4 py-2 rounded">
                            Confirm Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
