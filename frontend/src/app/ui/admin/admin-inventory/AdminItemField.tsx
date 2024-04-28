'use server';
import { Item } from "@/app/lib/interfaces";
import Link from "next/link";
import InventoryQuantity from "./InventoryQuantity";

export default async function AdminItemField({ item }: { item: Item }) {
    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-3">
            <div className="text-green-900 text-2xl font-medium">{item.name}</div>
            <div>{item.description}</div>
            <div className="flex gap-5">
                <Link href={`/admin/inventory/${item.id}`}><button className="bg-green-900 text-white rounded text-l p-2 font-medium">Inventory Units</button></Link>
                <InventoryQuantity itemQuantity={item.inventoryQuantity} itemId={item.id} />
            </div>
        </div>
    );
}