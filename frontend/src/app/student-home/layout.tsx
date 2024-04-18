'use client';

import Navbar from "../ui/StudentNavbar";
import { CartItem } from "../lib/interfaces";
import { useContext, useEffect } from "react";
import { userContext } from "../lib/contexts";

export default async function Layout({ children }: { children: React.ReactNode }) {
    //temp
    const cartItems: Array<CartItem> = [{
        id: -1,
        item: {
            id: -1,
            name: "",
            description: "",
            category: "Laptops",
        },
        quantity: 0
    }];

    return (
        <div>
            <Navbar cartItems={cartItems} />
            {children}
        </div>
    );
}