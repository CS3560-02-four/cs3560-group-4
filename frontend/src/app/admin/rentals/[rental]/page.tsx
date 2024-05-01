'use server';

import { fetchAllRentals } from "@/app/lib/data";
import { AdminRental, DataResponse, ItemUnit } from "@/app/lib/interfaces";
import AdminRentalItemField from "@/app/ui/admin/admin-rentals/AdminRentalItemField";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { formatDatetime } from "@/app/lib/utils";
import Link from "next/link";

export default async function Page({ params }: { params: { rental: string } }) {

    function sortFn(a: ItemUnit, b: ItemUnit) {
        if (a.status === "normal" && b.status === "damaged")
            return -1;
        else if (a.status === "damaged" && b.status === "normal")
            return 1;
        else
            return 0;
    }

    const response: DataResponse = await fetchAllRentals();
    const rental: AdminRental = response.data.filter((data: any) => data.id === parseInt(params.rental))[0];
    if (cookies().has('admin')) {
        return (
            <div className="relative top-32 flex flex-col items-center gap-5">
                <div className="text-3xl font-medium text-green-900">Rental #{rental.id} for {rental.accountName}</div>
                <div className="flex gap-10 justify-center text-xl text-green-900">
                    <div>Pickup: {formatDatetime(rental.pickupDatetime)}</div>
                    <div>Return: {formatDatetime(rental.returnDatetime)}</div>
                </div>
                <div className="flex gap-3">
                    <Link href={`/admin/accounts/${rental.accountId}`}><button className="text-white rounded text-l p-2 font-medium bg-green-900">Go to Account</button></Link>
                    <Link href="/admin/rentals"><button className="text-white rounded text-l p-2 font-medium bg-green-900">Back to All Rentals</button></Link>
                </div>
                <div className="flex flex-col gap-9 w-[60%]">
                    {rental.itemUnits?.sort(sortFn).map((unit: ItemUnit) => <AdminRentalItemField key={unit.id} itemUnit={unit} />)}
                </div>
            </div>
        );
    }   
    else {
        redirect("/admin-login");
    }
}