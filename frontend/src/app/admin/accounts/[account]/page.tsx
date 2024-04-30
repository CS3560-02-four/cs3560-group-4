'use server';

import { fetchAccountData, getRentals } from "@/app/lib/data";
import { Account, AdminRental, Rental } from "@/app/lib/interfaces";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminRentalField from "@/app/ui/admin/admin-rentals/AdminRentalField";
import Link from "next/link";
import { formatDatetime } from "@/app/lib/utils";
import AccountStatusButton from "@/app/ui/admin/admin-accounts/AccountStatusButton";

export default async function Page({ params }: { params: { account: string } }) {
    //Fetch account data and rentals
    const accountResponse = await fetchAccountData(parseInt(params.account));
    const account: Account = accountResponse.data;
    const rentalsResponse = await getRentals(parseInt(params.account));
    let rentals: Array<AdminRental> = [];
    if (rentalsResponse.data) {
        rentals = rentalsResponse.data.filter((rental: Rental) => rental.status === "reserved" || rental.status === "active").map((rental: Rental) => {
            const adminRental: AdminRental = {
                id: rental.id,
                pickupDatetime: formatDatetime(rental.pickupDatetime),
                returnDatetime: formatDatetime(rental.returnDatetime),
                status: rental.status === "reserved" ? "reserved" : "active",
                accountId: account.id,
                accountName: account.firstName + " " + account.lastName
            };
            return adminRental;
        });
    }

    const statusTextColor = account.status === "normal" ? "text-green-900" : "text-yellow-600";


    if (cookies().has('admin')) {
        return (
            <div className="relative top-32 flex flex-col items-center gap-5">
                <div className="text-3xl font-medium text-green-900">Account #{account.id}: {account.firstName} {account.lastName}</div>
                <div className="text-2xl font-medium text-green-900">Account Balance: ${account.balance}</div>
                <div className={`text-2xl font-medium ${statusTextColor}`}>Status: {account.status[0].toUpperCase()}{account.status.slice(1)}</div>
                <div className="text-xl font-medium text-green-900">Email Address: {account.email}</div>
                <div className="text-xl font-medium text-green-900">Billing Address: {account.address}</div>
                <div className="flex gap-3">
                    <Link href={`/admin/accounts/balance/${params.account}`}><button className="text-white rounded text-l p-2 font-medium bg-green-900">Change Balance</button></Link>
                    <AccountStatusButton accountId={account.id} status={account.status} />
                </div>
                {rentals.length !== 0 ? <div className="flex flex-col gap-9 w-[60%]">{rentals.map((rental: AdminRental) => <AdminRentalField key={rental.id} adminRental={rental} displayLinkToAccount={false} />)}</div> : <div>There are no rentals for this account.</div>}
            </div>
        );
    }
    else {
        redirect("/admin-login");
    }
}