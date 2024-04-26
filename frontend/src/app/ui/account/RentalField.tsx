'use client';
import { Rental } from "@/app/lib/interfaces";
import Link from "next/link";
import { formatDatetime } from "@/app/lib/utils";
import { cancelRental } from "@/app/lib/data";
import { redirect, useRouter } from "next/navigation";

export default function RentalField({ rental }: { rental: Rental }) {
    function onCancelRental() {
        cancelRental(rental.id);
        redirect("/student/account");
    }

    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-3">
            <div className="text-green-900 text-2xl font-medium">Rental #{rental.id}</div>
            <div>Status: {rental.status[0].toUpperCase()}{rental.status.slice(1)}</div>
            {rental.status === "reserved" ? <div>Pickup confirmed: {formatDatetime(rental.pickupDatetime)}</div> : null}
            {rental.status === "active" ? <div>Return expected: {formatDatetime(rental.returnDatetime)}</div> : null}
            <div className="flex gap-7 justify-center">
                <Link href={`/student/rental/${rental.id}`} className="bg-green-900 text-white rounded text-sm p-2 font-medium">
                    <button >
                        Details
                    </button>
                </Link>
                {rental.status === "reserved" ? <button onClick={onCancelRental} className="bg-red-700 text-white rounded text-sm p-2 font-medium">Cancel Rental Reservation</button> : null}
            </div>
        </div>
    );
}