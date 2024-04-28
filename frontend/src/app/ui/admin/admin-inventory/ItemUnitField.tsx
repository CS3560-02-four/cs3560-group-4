import { ItemUnit } from "@/app/lib/interfaces";
import Link from "next/link";

export default function ItemUnitField({ itemUnit }: { itemUnit: ItemUnit }) {
    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-3">
            <div className="text-green-900 text-2xl font-medium">Unit #{itemUnit.id}</div>
            {itemUnit.rentalId !== null ? <div className="text-green-900 text-2xl font-medium">On rental #{itemUnit.rentalId}</div> : <div className="text-green-900 text-2xl font-medium">Not on rental.</div>}
            <div className="flex gap-5">
                {itemUnit.rentalId !== null ? <Link href={`/admin/rentals/${itemUnit.rentalId}`}><button className="bg-green-900 text-white rounded text-l p-2 font-medium">Go to Rental</button></Link> : null}
                <button className="text-white rounded text-l p-2 font-medium bg-yellow-600">Mark as Damaged</button>
            </div>
        </div>
    );
}