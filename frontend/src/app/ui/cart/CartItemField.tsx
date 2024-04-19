import { CartItem } from "../../lib/interfaces";
import QuantityPicker from "./QuantityPicker";

export default function CartItemField({ cartItem, onUpdateItemQuantity, onRemoveItem }: { cartItem: CartItem, onUpdateItemQuantity: Function, onRemoveItem: Function }) {

    //Get new quantity, pass along with this item's id
    function onUpdate(quantity: number) {
        onUpdateItemQuantity(cartItem.id, quantity);
    }

    function removeItem() {
        onRemoveItem(cartItem.id);
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