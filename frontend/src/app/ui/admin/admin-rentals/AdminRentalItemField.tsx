import { ItemUnit } from "@/app/lib/interfaces";

export default function AdminRentalItemField({ itemUnit }: { itemUnit: ItemUnit }) {

    const statusTextColor = itemUnit.status === "normal" ? "text-green-900" : "text-yellow-600";

    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-3">
            <div className="text-green-900 text-2xl font-medium">{itemUnit.name}</div>
            <div className="text-green-900 text-xl font-medium">Unit #{itemUnit.id}</div>
            <div className={`${statusTextColor} text-xl font-medium`}>Status: {itemUnit.status[0].toUpperCase()}{itemUnit.status.slice(1)}</div>
            <button className="text-white rounded text-l p-2 font-medium bg-yellow-600">Mark as Damaged</button>
        </div>
    );
}