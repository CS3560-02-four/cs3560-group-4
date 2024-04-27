'use client';
import { Item } from "@/app/lib/interfaces";
import Link from "next/link";

export default function AdminItemField({ item }: { item: Item }) {
    return (
        <div>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>
                <Link href={`/admin/inventory/${item.id}`}><button>Inventory Units</button></Link>
                <button>Delete</button>
                <div>Quantity: <input type="text" value={item.inventoryQuantity}></input></div>
            </div>
        </div>
    );
}