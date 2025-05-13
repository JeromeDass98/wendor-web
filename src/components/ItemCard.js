"use client";

import { addToCart } from "../lib/inventory.js";
import { useCart } from "../context/cart.js";
import { useEffect, useState } from "react";

export default function ItemCard({ item }) {
    const { getQuantity, setCart } = useCart();

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(getQuantity(item._id));
    }, []);

    async function add(action) {
        const payload = {
            product_id: item._id,
            action,
        };
        const data = await addToCart(payload);
        setCart(data);
        if (action === 'add') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="border rounded shadow p-4">
            <img src={item.image || null} alt={item.name} className="w-full h-48 object-cover" />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>₹{item.price}</p>
            <p>Available: {item.stock}</p>
            {!quantity ? (
                <button className="cursor-pointer mt-2 bg-blue-500 text-white px-2 py-1 rounded" onClick={() => add("add")}>
                    Add to Cart
                </button>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <button onClick={() => add("minus")} className="px-2 py-1 border rounded">
                            -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => add("add")} className="px-2 py-1 border rounded">
                            +
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
