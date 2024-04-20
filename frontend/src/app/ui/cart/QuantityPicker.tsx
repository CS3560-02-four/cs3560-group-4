'use client';
import { useState } from "react";

export default function QuantityPicker({ itemQuantity, onUpdateQuantity, availableQuantity }: { itemQuantity: number, onUpdateQuantity: Function, availableQuantity: number }) {
    const [quantity, setQuantity] = useState(itemQuantity);

    function incrementQuantity() {
        const newQuantity = quantity + 1;
        if (newQuantity > availableQuantity) {
            setQuantity(newQuantity);
            onUpdateQuantity(newQuantity);
        }
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
            <button onClick={decrementQuantity} className="w-9 h-9 bg-gray-200 rounded hover:bg-gray-300">-</button>
            <input type="text" className="w-6 text-center" onChange={handleTextInputChange} value={quantity} />
            <button onClick={incrementQuantity} className="w-9 h-9 bg-gray-200 rounded hover:bg-gray-300">+</button>
        </div>
    );
}