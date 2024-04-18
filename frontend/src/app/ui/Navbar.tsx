'use client'

import Link from "next/link";
import CartButton from "./CartButton";
import CartPopup from "./CartPopup";
import AccountButton from "./AccountButton";
import AccountPopup from "./AccountPopup";
import { CartItem } from "../lib/interfaces";
import { useState } from "react";

export default function Navbar({ cartItems } : { cartItems: Array<CartItem> }) {
    const [cartOpen, setCartOpen] = useState(false);
    const [accountPopupOpen, setAccountPopupOpen] = useState(false);

    function handleClickCart() {
        setCartOpen(!cartOpen);
        setAccountPopupOpen(false);
    }

    function handleClickAccount() {
        setAccountPopupOpen(!accountPopupOpen);
        setCartOpen(false);
    }

    return (
        <div className="fixed w-full">
            <div className="bg-green-950 text-white h-[100px] w-full flex justify-between">
                <Link href="/student-home" className="text-6xl">Cal Poly Pomona</Link>
                <div className="flex gap-10">
                    <AccountButton handleClick={handleClickAccount} popupOpen={accountPopupOpen} />
                    <CartButton handleClick={handleClickCart} cartOpen={cartOpen} />
                </div>
            </div>
            <div className="flex h-full w-full justify-end gap-8">
                    {accountPopupOpen ? <AccountPopup /> : null}
                    {cartOpen ? <CartPopup cartItems={cartItems} /> : null}
            </div>
        </div>
    );
}