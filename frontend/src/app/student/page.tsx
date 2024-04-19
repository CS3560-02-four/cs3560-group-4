'use server';

import { fetchAllItems } from "../lib/data";
import ItemField from "../ui/ItemField";
import { DataResponse, Item } from "../lib/interfaces";
import { cookies } from "next/headers";

export default async function Page() {
    const response: DataResponse = await fetchAllItems();

    let accountId: number;
    const accountIdCookieValue = cookies().get('account')?.value;
    if (accountIdCookieValue !== undefined) {
        accountId = parseInt(accountIdCookieValue);
    }
    
    return (
        <div className="flex flex-col gap-4">
            <h1>Cal Poly Pomona Rental Service - CS Department</h1>
            {response.data.map((item: Item) => {
                return <ItemField item={item} key={item.id} accountId={accountId} />
            })}
        </div>
    );
}