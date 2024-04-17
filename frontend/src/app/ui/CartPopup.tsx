import { CartItem } from "../lib/interfaces";

export default function CartPopup({ cartItems } : { cartItems: Array<CartItem> }) {
    return <div className="flex flex-col w-52 h-full gap-2 bg-white">
        {cartItems.map((cartItem: CartItem) => {
            return <div>
                <h3>{cartItem.item.name}</h3>
                <h3>Quantity: {cartItem.quantity}</h3>
            </div>
        })}
    </div>;
}