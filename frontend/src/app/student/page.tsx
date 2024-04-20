'use server';

import { fetchAllItems } from "../lib/data";
import { logoutAction } from "../lib/actions";
import { DataResponse } from "../lib/interfaces";
import { getAccountId } from "../lib/cookies";
import HomePageItemContainer from "../ui/home/HomePageItemContainer";

export default async function Page() {
    const response: DataResponse = await fetchAllItems();
    const items = response.data;

    let accountId: number;
    const accountIdCookieValue = getAccountId();
    if (accountIdCookieValue !== undefined) {
        accountId = parseInt(accountIdCookieValue);
        return (
            <div className="flex flex-col gap-4">
                <h1>Cal Poly Pomona Rental Service - CS Department</h1>
                <HomePageItemContainer items={items} accountId={accountId} />
            </div>
        );
    }
    else {
        logoutAction();
    }
}