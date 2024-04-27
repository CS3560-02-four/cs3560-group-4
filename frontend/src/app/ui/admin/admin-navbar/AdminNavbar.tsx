'use client'
import { logoutAdmin } from "@/app/lib/actions";
import Link from "next/link";

export default function AdminNavbar() {
    function onLogout() {
        logoutAdmin();
    }

    return (
        <div className="fixed w-full z-10">
            <div className="bg-green-900 text-white h-[100px] w-full flex justify-between items-center p-3 pr-9">
                <Link href="/admin" className="text-6xl flex flex-col gap-2 items-center">Cal Poly Pomona <div className="text-base">Equipment Rental System - Admin</div></Link>
                <button onClick={onLogout} className="bg-white text-green-900 rounded text-xl p-2 font-medium">Logout</button>
            </div>
        </div>
    );
}