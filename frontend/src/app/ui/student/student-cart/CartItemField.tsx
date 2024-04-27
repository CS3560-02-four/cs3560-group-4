'use client';
import { CartItem } from "@/app/lib/interfaces";
import QuantityPicker from "./QuantityPicker";
import { useRouter } from "next/navigation";

export default function CartItemField({ cartItem, onUpdateItemQuantity, onRemoveItem }: { cartItem: CartItem, onUpdateItemQuantity: Function, onRemoveItem: Function }) {
    const router = useRouter();

    //Get new quantity, pass along with this item's id
    function onUpdate(quantity: number) {
        onUpdateItemQuantity(cartItem, quantity);
        router.refresh();
    }

    function removeItem() {
        onRemoveItem(cartItem);
        router.refresh();
    }

    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-2">
            <div>
                <div className="text-green-900 text-2xl font-medium">{cartItem.item.name}</div>
                <div>{cartItem.item.description}</div>
            </div>
            <QuantityPicker itemQuantity={cartItem.quantity} onUpdateQuantity={onUpdate} availableQuantity={cartItem.item.availableQuantity} />
            <div className="flex justify-center">
                <button onClick={removeItem} className="bg-red-700 text-white rounded text-sm p-2 font-medium w-[10%]">
                    Remove
                </button>
            </div>
        </div>
    );
}