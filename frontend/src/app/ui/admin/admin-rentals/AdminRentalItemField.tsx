'use client';
import { ItemUnit } from "@/app/lib/interfaces";
import { markItemDamaged, markItemNotDamaged } from "@/app/lib/data";
import { useState } from "react";

export default function AdminRentalItemField({ itemUnit }: { itemUnit: ItemUnit }) {
    const [damaged, setDamaged] = useState(itemUnit.status === "damaged");
    const statusTextColor = !damaged ? "text-green-900" : "text-yellow-600";

    function onMarkDamaged() {
        markItemDamaged(itemUnit.id);
        setDamaged(true);
    }

    function onUnmarkDamaged() {
        markItemNotDamaged(itemUnit.id);
        setDamaged(false);
    }

    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-3">
            <div className="text-green-900 text-2xl font-medium">{itemUnit.name}</div>
            <div className="text-green-900 text-xl font-medium">Unit #{itemUnit.id}</div>
            <div className={`${statusTextColor} text-xl font-medium`}>Status: {damaged ? "Damaged" : "Normal"}</div>
            {!damaged ? <button className="text-white rounded text-l p-2 font-medium bg-yellow-600 w-[20%]" onClick={onMarkDamaged}>Mark as Damaged</button> : <button className="text-white rounded text-l p-2 font-medium bg-green-900 w-[20%]" onClick={onUnmarkDamaged}>Mark as Not Damaged</button>}
        </div>
    );
}