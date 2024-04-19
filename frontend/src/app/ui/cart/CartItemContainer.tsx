'use client';

import { CartItem } from "@/app/lib/interfaces";
import CartItemField from "./CartItemField";
import { useState } from "react";
import { updateCartItemQuantityAction, removeCartItemAction } from "@/app/lib/actions";

export default function CartItemContainer({ cartItems, }: { cartItems: Array<CartItem>, }) {
    const [items, setItems] = useState(cartItems);

    //Update quantity on the server
    function onUpdateItemQuantity(cartItemId: number, quantity: number) {
        updateCartItemQuantityAction(cartItemId, quantity);
    }

    //remove item from cart on the server and from the UI
    function onRemoveItem(cartItemId: number) {
        removeCartItemAction(cartItemId);
        const itemsFiltered = items.filter((item: CartItem) => item.id !== cartItemId);
        setItems(itemsFiltered);
    }


    return (
        <div className="relative top-32 flex flex-col gap-7">
            {items.map((cartItem: CartItem) => <CartItemField key={cartItem.id} cartItem={cartItem} onUpdateItemQuantity={onUpdateItemQuantity} onRemoveItem={onRemoveItem} />)}
        </div>
    );
}