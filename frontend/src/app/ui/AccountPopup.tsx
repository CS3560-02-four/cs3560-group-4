import { Account } from "../lib/interfaces";
import Link from "next/link";
import { logoutAction } from "../lib/actions";

export default function AccountPopup({ account }: { account: Account }) {

    function onLogout() {
        logoutAction();
    }

    return (
        <div className="bg-white text-green-950 flex flex-col">
            <h1>{account.firstName} {account.lastName}</h1>
            <Link href="/student/account">My Account</Link>
            <Link href="/student/rentals">My Rentals</Link>
            <button onClick={onLogout}>
                Logout
            </button>
        </div>
    );
}