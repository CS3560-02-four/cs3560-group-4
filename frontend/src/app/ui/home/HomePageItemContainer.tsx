'use client';
import { Item } from "@/app/lib/interfaces";
import ItemField from "./ItemField";
import { useState } from "react";
import Filter from "./Filter";

export default function HomePageItemContainer({ items, accountId }: { items: Array<Item>, accountId: number }) {
    const [itemsDisplayed, setItemsDisplayed] = useState(items);

    function onSetFilter(filters: Array<string>) {
        if (filters.length === 0) {
            setItemsDisplayed(items);
        }
        else {
            setItemsDisplayed(items.filter((item: Item) => filters.includes(item.category)));
        }
    }

    return (
        <div className="flex justify-between p-5">
            <div className="w-[50%] pl-14 flex flex-col gap-10">
                {itemsDisplayed.map((item: Item) => {
                    return <ItemField item={item} key={item.id} accountId={accountId} />
                })}
            </div>
            <Filter onSetFilter={onSetFilter}/>
        </div>
    );
}