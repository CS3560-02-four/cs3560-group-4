'use server';

import { fetchItem } from "@/app/lib/data";
import Link from "next/link";
import { Item, DataResponse } from "@/app/lib/interfaces";
import { getAccountId } from "@/app/lib/utils";
import AddToCartButton from "@/app/ui/AddToCartButton";

export default async function Page({ params }: { params: { item: number } }) {
    const response: DataResponse = await fetchItem(params.item);
    const itemData = response.data;
    const accountIdCookieValue = getAccountId();
    if (accountIdCookieValue !== undefined) {
        return (
            <div className="relative top-40">
                <p>Name: {itemData.name}</p>
                <p>Description: {itemData.description}</p>
                <p>Category: {itemData.category}</p>
                <AddToCartButton accountId={parseInt(accountIdCookieValue)} item={itemData} />
                <Link href="/student">Go Back</Link>
            </div>
        );
    }

}