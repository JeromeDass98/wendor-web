"use client";

import ItemCard from "../components/ItemCard";
import { useEffect, useState } from "react";
import { useCart } from "../context/cart.js";
import { getItems, getItemCount, getCart } from "../lib/inventory.js";
import { useRouter } from "next/navigation";

const LIMIT = 10;

export default function ProductListPage() {
    const { cart, setCart } = useCart();
    const router = useRouter();

    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const params = {
          filter: {
            stock: { $gt: 0 }
          }
        };
        getItemCount(params).then(setCount);
        getCart().then(setCart);
    }, []);

    useEffect(() => {
        async function getData() {
            if (count) {
                const data = await getItems(page, LIMIT);
                setItems(data);
            }
        }
        getData();
    }, [count, page]);

    const totalPages = Math.ceil(count / LIMIT);

    const totalItemsInCart = cart?.products?.reduce((acc, item) => acc + item.quantity, 0);

    const handleCheckout = () => {
        if (totalItemsInCart > 0) {
            router.push("/checkout");
        } else {
            alert("Your cart is empty!");
        }
    };

    return (
        <div className="p-6">
            <div className="mt-6 flex justify-between items-center">
                <div>
                    <span className="font-bold">Items in Cart: </span>
                    <span>{totalItemsInCart}</span>
                </div>

                <button disabled={!cart?.products?.length} onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
                    Checkout
                </button>
            </div>
            <h1 className="text-xl font-bold mb-4">Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((item) => (
                    <ItemCard key={item._id} item={item} />
                ))}
            </div>

            <div className="mt-6 flex gap-2">
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                    Prev
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}
