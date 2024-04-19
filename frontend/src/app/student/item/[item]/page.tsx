'use server';

import { fetchItem } from "@/app/lib/data";
import Link from "next/link";
import { Item, DataResponse } from "@/app/lib/interfaces";

export default async function Page({ params }: { params: { item: number } }) {
    const response: DataResponse = await fetchItem(params.item);
    const itemData = response.data;
    return (
        <div className="relative top-40">
            <p>Name: {itemData.name}</p>
            <p>Description: {itemData.description}</p>
            <p>Category: {itemData.category}</p>
            <button className="h-6 w-[100px] bg-green-950 text-white">
                Add to Cart
            </button>
            <Link href="/student">Go Back</Link>
        </div>
    );
}