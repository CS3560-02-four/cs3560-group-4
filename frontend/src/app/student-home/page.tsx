'use server';

import { fetchAllItems } from "../lib/dataFetching";
import ItemField from "../ui/ItemField";
import { Item } from "../lib/interfaces";

export default async function Page() {
    const itemData = await fetchAllItems();
    const items = itemData.map((data: any) => {
        const item : Item = {
            id: data.item_id,
            name: data.name,
            description: data.description,
            quantity: data.quantity,
            category: data.category
        };
        return item;
    });

    return (
        <div className="flex flex-col gap-4">
            <h1>Cal Poly Pomona Rental Service - CS Department</h1>
            {items.map((item: Item) => {
                return <ItemField item={item} />
            })}
        </div>
    );
}