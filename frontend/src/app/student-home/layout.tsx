'use server';

import Navbar from "../ui/Navbar";
import { fetchCartItems } from "../lib/data";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cartItems = await fetchCartItems(3);

    return (
        <div>
            <Navbar cartItems={cartItems} />
            {children}
        </div>
    );
}