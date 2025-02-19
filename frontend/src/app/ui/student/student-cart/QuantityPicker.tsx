'use client';
import { useState } from "react";

export default function QuantityPicker({ itemQuantity, onUpdateQuantity, availableQuantity }: { itemQuantity: number, onUpdateQuantity: Function, availableQuantity?: number }) {
    const [quantity, setQuantity] = useState(itemQuantity);
    const [maxReached, setMaxReached] = useState(itemQuantity === availableQuantity);

    function incrementQuantity() {
        const newQuantity = quantity + 1;
        if (availableQuantity !== undefined && newQuantity <= availableQuantity) {
            setQuantity(newQuantity);
            onUpdateQuantity(newQuantity);
            if (newQuantity === availableQuantity) {
                setMaxReached(true);
            }
        }
    }

    function decrementQuantity() {
        const newQuantity = quantity - 1;
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            onUpdateQuantity(newQuantity);
            setMaxReached(false);
        }
    }

    function handleTextInputChange(event: any) {
        const newQuantity = event.target.value;
        if (availableQuantity !== undefined && newQuantity > quantity) {
            if (newQuantity <= availableQuantity) {
                setQuantity(newQuantity);
                onUpdateQuantity(newQuantity);
                if (newQuantity === availableQuantity) {
                    setMaxReached(true);
                }
            }
        }
        else if (newQuantity < quantity) {
            if (newQuantity > 0) {
                setQuantity(newQuantity);
                onUpdateQuantity(newQuantity);
                setMaxReached(false);
            }
        }
    }

    return (
        <div>
            <div className="flex gap-1">
                <button onClick={decrementQuantity} className="w-9 h-9 bg-gray-200 rounded hover:bg-gray-300">-</button>
                <input type="text" className="w-6 text-center" onChange={handleTextInputChange} value={quantity} />
                <button onClick={incrementQuantity} className="w-9 h-9 bg-gray-200 rounded hover:bg-gray-300">+</button>
            </div>
            {maxReached ? <div className="text-red-600 pt-2">Maximum available quantity reached.</div> : null}
        </div>
    );
}