'use server';
import { cookies } from "next/headers";
import { CartItem, DataResponse } from "@/app/lib/interfaces";
import { redirect } from "next/navigation";
import { getAccountId, logout } from "@/app/lib/cookies";
import { fetchCartItems } from "@/app/lib/data";
import CartItemContainer from "@/app/ui/student/student-cart/CartItemContainer";
import CartSummaryField from "@/app/ui/student/student-cart/CartSummaryField";

export default async function Page() {
    const accountIdCookieValue = getAccountId();
    if (accountIdCookieValue !== undefined) {
        const accountId = parseInt(accountIdCookieValue);
        //fetch cart items for account id
        const response: DataResponse = await fetchCartItems(accountId);
        const cartItems: Array<CartItem> = response.data;
        if (cartItems.length !== 0) {
            return (
                <div className="relative top-32 flex justify-between px-20">
                    <CartItemContainer cartItems={cartItems} />
                    <CartSummaryField />
                </div>
            );
        }
        else {
            return (
                <div className="relative top-32 flex justify-center items-center">
                    Your cart is empty.
                </div>
            );
        }
    }
    else {
        logout();
        redirect("/student-login");
    }
}