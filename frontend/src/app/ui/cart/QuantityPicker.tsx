'use client';
import { useState } from "react";

export default function QuantityPicker({ itemQuantity, onUpdateQuantity }: { itemQuantity: number, onUpdateQuantity: Function }) {
    const [quantity, setQuantity] = useState(itemQuantity);

    function incrementQuantity() {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onUpdateQuantity(newQuantity);
    }

    function decrementQuantity() {
        const newQuantity = quantity - 1;
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            onUpdateQuantity(newQuantity);
        }
    }

    function handleTextInputChange(event: any) {
        setQuantity(event.target.value);
    }

    return (
        <div className="flex gap-1">
            <button onClick={decrementQuantity}>-</button>
            <input type="text" className="w-4" onChange={handleTextInputChange} value={quantity}/>
            <button onClick={incrementQuantity}>+</button>
        </div>
    );
}