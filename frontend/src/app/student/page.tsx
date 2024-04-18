'use server';

import { fetchAllItems } from "../lib/data";
import ItemField from "../ui/ItemField";
import { Item } from "../lib/interfaces";

export default async function Page() {
    const items = await fetchAllItems();

    return (
        <div className="flex flex-col gap-4">
            <h1>Cal Poly Pomona Rental Service - CS Department</h1>
            {items.map((item: Item) => {
                return <ItemField item={item} key={item.id} />
            })}
        </div>
    );
}