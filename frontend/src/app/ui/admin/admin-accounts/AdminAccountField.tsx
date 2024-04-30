import { Account } from "@/app/lib/interfaces";
import Link from "next/link";
import AccountStatusButton from "./AccountStatusButton";

export default function AdminAccountField({ account }: { account: Account }) {

    const statusTextColor =  account.status === "normal" ? "text-green-900" : "text-yellow-600";

    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-3 w-[100%]">
            <div className={`${statusTextColor} text-2xl font-medium`}>{account.firstName} {account.lastName} - account #{account.id}</div>
            <div className={`${statusTextColor} text-xl font-medium`}>Status: {account.status[0].toUpperCase()}{account.status.slice(1)}</div>
            <div className={`${statusTextColor} text-xl font-medium`}>Balance: ${account.balance}</div>
            <div className="flex gap-4">
                <Link href={`/admin/accounts/${account.id}`}><button className="bg-green-900 text-white rounded text-l p-2 font-medium">Account Details</button></Link>
                <AccountStatusButton accountId={account.id} status={account.status} />
                <Link href={`/admin/accounts/balance/${account.id}`} className="bg-green-900 text-white rounded text-l p-2 font-medium">Change Balance</Link>
            </div>
        </div>
    );
}