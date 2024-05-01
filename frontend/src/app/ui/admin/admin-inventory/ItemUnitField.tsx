'use client';
import { markItemDamaged } from "@/app/lib/data";
import { ItemUnit } from "@/app/lib/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ItemUnitField({ itemUnit }: { itemUnit: ItemUnit }) {
    const [damaged, setDamaged] = useState(itemUnit.status === "damaged");
    const statusTextColor = !damaged ? "text-green-900" : "text-yellow-600";

    function onMarkDamaged() {
        markItemDamaged(itemUnit.id);
        setDamaged(true);
    }

    function onUnmarkDamaged() {
        
    }

    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-3">
            <div className="text-green-900 text-2xl font-medium">Unit #{itemUnit.id}</div>
            {itemUnit.rentalId !== null ? <div className="text-green-900 text-xl font-medium">On rental #{itemUnit.rentalId}</div> : <div className="text-green-900 text-xl font-medium">Not on rental.</div>}
            <div className={`${statusTextColor} text-xl font-medium`}>Status: {damaged ? "Damaged" : "Normal"}</div>
            <div className="flex gap-5">
                {itemUnit.rentalId !== null ? <Link href={`/admin/rentals/${itemUnit.rentalId}`}><button className="bg-green-900 text-white rounded text-l p-2 font-medium">Go to Rental</button></Link> : null}
                {!damaged ? <button className="text-white rounded text-l p-2 font-medium bg-yellow-600" onClick={onMarkDamaged}>Mark as Damaged</button> : <button className="text-white rounded text-l p-2 font-medium bg-green-900" onClick={onUnmarkDamaged}>Mark as Not Damaged</button>}
            </div>
        </div>
    );
}