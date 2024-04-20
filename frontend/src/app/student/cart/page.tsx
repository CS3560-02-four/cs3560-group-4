'use server';
import { cookies } from "next/headers";
import { CartItem, DataResponse } from "@/app/lib/interfaces";
import { redirect } from "next/navigation";
import { getAccountId, logout } from "@/app/lib/cookies";
import { fetchCartItems } from "@/app/lib/data";
import CartItemContainer from "@/app/ui/cart/CartItemContainer";
import CartSummaryField from "@/app/ui/cart/CartSummaryField";

export default async function Page() {
    const accountIdCookieValue = getAccountId();
    if (accountIdCookieValue !== undefined) {
        const accountId = parseInt(accountIdCookieValue);
        //fetch cart items for account id
        const response: DataResponse = await fetchCartItems(accountId);
        const cartItems: Array<CartItem> = response.data;
        return (
            <div className="flex gap-20 w-full relative top-44">
                <CartItemContainer cartItems={cartItems} />
                <CartSummaryField />
            </div>
        );
    }
    else {
        logout();
        redirect("/student-login");
    }
}