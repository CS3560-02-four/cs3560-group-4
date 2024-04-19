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
        <div className="fixed w-full">
            <div className="bg-green-950 text-white h-[100px] w-full flex justify-between">
                <Link href="/student" className="text-6xl">Cal Poly Pomona</Link>
                <div className="flex gap-10">
                    <CartButton />
                    <AccountButton handleClick={handleClickAccount} popupOpen={accountPopupOpen} />
                </div>
            </div>
            <div className="flex h-full w-full justify-end gap-8">
                    {accountPopupOpen ? <AccountPopup firstName={account.firstName} lastName={account.lastName} /> : null}
            </div>
        </div>
    );
}