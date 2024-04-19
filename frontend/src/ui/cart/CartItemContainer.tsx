'use client';

import { CartItem } from "@/lib/interfaces";
import CartItemField from "./CartItemField";
import { useState } from "react";
import { updateCartItemQuantity, removeCartItem } from "@/lib/data";

export default function CartItemContainer({ cartItems, }: { cartItems: Array<CartItem>, }) {
    const [items, setItems] = useState(cartItems);

    //Update quantity on the server
    function onUpdateItemQuantity(cartItem: CartItem, quantity: number) {
        updateCartItemQuantity(cartItem.id, quantity);
        //check for errors
    }

    //remove item from cart on the server and from the UI
    function onRemoveItem(cartItem: CartItem) {
        removeCartItem(cartItem.id);
        //check for errors
        const itemsFiltered = items.filter((item: CartItem) => item.id !== cartItem.id);
        setItems(itemsFiltered);
    }

    return (
        <div className="relative top-32 flex flex-col gap-7">
            {items.map((cartItem: CartItem) => <CartItemField key={cartItem.id} cartItem={cartItem} onUpdateItemQuantity={onUpdateItemQuantity} onRemoveItem={onRemoveItem} />)}
        </div>
    );
}