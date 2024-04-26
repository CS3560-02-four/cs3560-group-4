'use client';
import { Account } from "@/app/lib/interfaces";
import { logoutAction } from "@/app/lib/actions";

export default function AccountInfoField({ account }: { account: Account }) {

    function onLogout() {
        logoutAction();
    }

    return (
        <div className="flex flex-col shadow-md gap-4 items-center justify-between p-5 h-[250px]">
            <div className="text-green-900 text-2xl font-medium">{account.firstName} {account.lastName}</div>
            <div className="text-green-900 text-lg">{account.email}</div>
            <div>Account Balance: {account.balance}</div>
            <div className="flex gap-2">
                <button className="bg-green-900 text-white rounded text-lg p-2 font-medium">Pay Balance</button>
                <button onClick={onLogout} className="bg-green-900 text-white rounded text-lg p-2 font-medium">Logout</button>
            </div>
        </div>
    );
}