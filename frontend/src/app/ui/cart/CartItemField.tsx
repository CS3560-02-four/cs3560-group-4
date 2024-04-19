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
        <div>
            <h1>{cartItem.item.name}</h1>
            <QuantityPicker itemQuantity={cartItem.quantity} onUpdateQuantity={onUpdate} />
            <button onClick={removeItem}>
                Remove
            </button>
        </div>
    );
}