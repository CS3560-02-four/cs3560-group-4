'use server';

import { fetchItem } from "@/app/lib/dataFetching";
import { Item } from "@/app/lib/interfaces";

export default async function Page({ params }: { params: { item: number } }) {
    const itemData = await fetchItem(params.item);
    const item : Item = {
        id: itemData[0].item_id,
        name: itemData[0].name,
        description: itemData[0].description,
        quantity: itemData[0].quantity,
        category: itemData[0].category
    };

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