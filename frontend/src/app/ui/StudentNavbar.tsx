'use client'

import Link from "next/link";
import CartButton from "./CartButton";
import AccountButton from "./AccountButton";
import AccountPopup from "./AccountPopup";
import { useState } from "react";
import { Account } from "../lib/interfaces";

export default function StudentNavbar({ account }: { account: Account }) {
    const [accountPopupOpen, setAccountPopupOpen] = useState(false);

    function handleClickAccount() {
        setAccountPopupOpen(!accountPopupOpen);
    }

    return (
        <div className="fixed w-full z-10">
            <div className="bg-green-900 text-white h-[100px] w-full flex justify-between items-center p-3 pr-9">
                <Link href="/student" className="text-6xl">Cal Poly Pomona</Link>
                <div className="flex gap-10">
                    <CartButton />
                    <AccountButton handleClick={handleClickAccount} />
                </div>
            </div>
            <div className="flex h-full w-full justify-end gap-8 pr-6">
                    {accountPopupOpen ? <AccountPopup account={account} onRedirect={handleClickAccount} /> : null}
            </div>
        </div>
    );
}