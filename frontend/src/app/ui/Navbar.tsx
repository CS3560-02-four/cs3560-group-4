'use client'

import Link from "next/link";
import CartButton from "./CartButton";
import CartPopup from "./CartPopup";
import { CartItem } from "../lib/interfaces";
import { useState } from "react";

export default function Navbar({ cartItems } : { cartItems: Array<CartItem> }) {
    const [cartOpen, setCartOpen] = useState(false);

    function handleClick() {
        setCartOpen(!cartOpen)
    }

    return (
        <div className="fixed w-full">
            <div className="bg-green-950 text-white h-[100px] w-full flex justify-between">
                <Link href="/student-home" className="text-6xl">Cal Poly Pomona</Link>
                <div className="flex gap-10">
                    <h3 className="text-4xl">Account</h3>
                    <CartButton handleClick={handleClick} cartOpen={cartOpen} />
                </div>
            </div>
            <div className="flex h-full w-full justify-end">
                    {cartOpen ? <CartPopup cartItems={cartItems} /> : null }
            </div>
        </div>
    );
}