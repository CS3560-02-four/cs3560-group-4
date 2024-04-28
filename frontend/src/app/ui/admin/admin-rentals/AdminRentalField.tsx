'use client';
import { confirmRentalPickup, confirmRentalReturn } from "@/app/lib/data";
import { AdminRental } from "@/app/lib/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminRentalField({ adminRental }: { adminRental: AdminRental }) {
    const router = useRouter();

    function onConfirmPickup() {
        confirmRentalPickup(adminRental.id);
        router.refresh();
    }

    function onConfirmReturn() {
        confirmRentalReturn(adminRental.id);
        router.refresh();
    }

    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-3">
            <div className="text-green-900 text-2xl font-medium">Rental #{adminRental.id} by {adminRental.accountName} (Account #{adminRental.accountId})</div>
            <div className="text-green-900 text-xl font-medium">Status: {adminRental.status[0].toUpperCase()}{adminRental.status.slice(1)}</div>
            <div className="flex flex-col gap-1">
                <div className="text-green-900 text-lg">Pickup on {adminRental.pickupDatetime}</div>
                <div className="text-green-900 text-lg">Return on {adminRental.returnDatetime}</div>
            </div>
            <div className="flex gap-4">
                <Link href={`/admin/account/${adminRental.accountId}`}><button className="bg-green-900 text-white rounded text-l p-2 font-medium">Go to Account</button></Link>
                <Link href={`/admin/rentals/${adminRental.id}`}><button className="bg-green-900 text-white rounded text-l p-2 font-medium">Rental Details</button></Link>
                {adminRental.status === "reserved" ? <button className="bg-green-900 text-white rounded text-l p-2 font-medium" onClick={onConfirmPickup}>Confirm Pickup</button> : <button className="bg-green-900 text-white rounded text-l p-2 font-medium" onClick={onConfirmReturn}>Confirm Return</button>}
            </div>
        </div>
    );
}