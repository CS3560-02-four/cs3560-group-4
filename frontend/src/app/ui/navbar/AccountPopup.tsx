import { Account } from "../../lib/interfaces";
import Link from "next/link";
import { logoutAction } from "../../lib/actions";

export default function AccountPopup({ account, onRedirect }: { account: Account, onRedirect: Function }) {

    function onLogout() {
        logoutAction();
    }

    function closePopup() {
        onRedirect();
    }

    return (
        <div className="bg-white text-green-950 flex flex-col border-solid border-green-900 border-2 rounded p-2 w-32 items-center">
            <h1 className="text-xl">{account.firstName} {account.lastName}</h1>
            <Link href="/student/account" onClick={closePopup} className="hover:underline">My Account</Link>
            <button onClick={onLogout} className="hover:underline">
                Logout
            </button>
        </div>
    );
}