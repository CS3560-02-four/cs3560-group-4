'use server';
import { cookies } from "next/headers";
import { CartItem, DataResponse } from "@/app/lib/interfaces";
import { redirect } from "next/navigation";
import { logout } from "@/app/lib/utils";
import { fetchCartItems } from "@/app/lib/data";
import CartItemContainer from "@/app/ui/cart/CartItemContainer";
import CartSummaryField from "@/app/ui/cart/CartSummaryField";

export default async function Page() {
    if (cookies().has('account')) {
        const accountIdCookieValue = cookies().get('account')?.value;
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
}