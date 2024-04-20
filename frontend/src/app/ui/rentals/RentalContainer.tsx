'use client';

import { Rental } from "@/app/lib/interfaces";
import { formatDatetime } from "@/app/lib/utils";

export default function RentalContainer({ rentals }: { rentals: Array<Rental> }) {
    return (
        <div className="flex flex-col relative top-52 gap-9">
            {rentals.map((rental: Rental) => {
                return (
                    <div className="border-solid border-4 border-green-950 flex gap-10 h-10 w-full">
                        <div>Rental #{rental.id}</div>
                        <div>Status: {rental.status[0].toUpperCase()}{rental.status.slice(1)}</div>
                        {rental.status === "reserved" ? <div>Pickup confirmed: {formatDatetime(rental.pickupDatetime)}</div> : null}
                        {rental.status === "active" ? <div>Return expected: {formatDatetime(rental.returnDatetime)}</div> : null}
                    </div>
                );
            })}
        </div>
    );
}