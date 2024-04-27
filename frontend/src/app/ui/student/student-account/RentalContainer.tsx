'use client';

import { Rental } from "@/app/lib/interfaces";
import { formatDatetime } from "@/app/lib/utils";
import Link from "next/link";
import RentalField from "./RentalField";

export default function RentalContainer({ rentals }: { rentals: Array<Rental> }) {
    return (
        <div className="flex flex-col gap-9 w-[50%]">
            {rentals.map((rental: Rental) => <RentalField rental={rental} />)}
        </div>
    );
}