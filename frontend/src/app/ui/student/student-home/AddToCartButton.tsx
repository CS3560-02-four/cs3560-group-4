'use client';
import { useRouter } from "next/navigation";
import { Item } from "../../../lib/interfaces";
import { addToCart } from "../../../lib/data";

export default function AddToCartButton({ accountId, item }: { accountId: number, item: Item }) {
    const router = useRouter();

    function onAddItemToCart() {
        if (accountId) {
            addToCart(accountId, item.id);
            router.refresh();
        }
    }

    return (
        <button className="bg-green-900 text-white rounded text-l p-2 font-medium" onClick={onAddItemToCart}>
            Add To Cart
        </button>
    );
}