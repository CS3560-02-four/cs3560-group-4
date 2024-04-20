import { ItemUnit } from "@/app/lib/interfaces";
import Image from "next/image";

export default function RentalItemField({ item }: { item: ItemUnit }) {
    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-3">
            <div>
                <Image src="" alt="Item image" width={50} height={50}/>
                <div className="text-green-900 text-2xl font-medium">{item.item.name}</div>
            </div>
            <div>Status: {item.status[0].toUpperCase()}{item.status.slice(1)}</div>
        </div>
    );
}