'use server';

import { fetchItem } from "@/app/lib/data";

export default async function Page({ params }: { params: { item: number } }) {
    const item = await fetchItem(params.item);

    return (
        <div>
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
            <p>Quantity available: {item.quantity}</p>
            <p>Category: {item.category}</p>
            <button className="h-6 w-[100px] bg-green-950 text-white">
                Add to Cart
            </button>
        </div>
    );
}