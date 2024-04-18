'use server';
import StudentNavbar from "../ui/StudentNavbar";
import { CartItem } from "../lib/interfaces";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchCartItems } from "../lib/data";

export default async function Layout({ children }: { children: React.ReactNode }) {
    //Check for active browser session
    if (cookies().has('account')) {
        const accountIdCookieValue = cookies().get('account')?.value;
        if (accountIdCookieValue !== undefined) {
            const accountId = parseInt(accountIdCookieValue);
            const cartItems: Array<CartItem> = await fetchCartItems(accountId);
            return (
                <div>
                    <StudentNavbar cartItems={cartItems} />
                    {children}
                </div>
            );
        }
    }   
    else {
        redirect("/student-login");
    }
}