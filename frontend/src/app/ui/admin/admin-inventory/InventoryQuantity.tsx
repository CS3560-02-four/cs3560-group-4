'use client';
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateInventoryQuantityAction } from "@/app/lib/actions";

export default function InventoryQuantity({ itemQuantity, itemId }: { itemQuantity: number | undefined, itemId: number }) {
    const [quantity, setQuantity] = useState(itemQuantity);
    const status = useFormStatus();
    const [state, action] = useFormState(updateInventoryQuantityAction, { message: "", error: "" });

    function onQuantityChange(event: any) {
        const newQuantity = event.target.value;
        setQuantity(newQuantity);
    }

    return (
        <form action={action} className="flex gap-3 items-center">
            <input type="submit" className="bg-red-700 text-white rounded text-sm p-2 font-medium cursor-pointer" onClick={() => { setQuantity(0) }} value="Delete" />
            <label htmlFor="quantity" className="text-green-900 text-[17px]">Quantity: </label>
            <input className="w-5 text-center bg-gray-200 rounded text-[17px]" type="text" value={quantity} name="quantity" onChange={onQuantityChange}></input>
            <input type="submit" value={status.pending ? "Confirming..." : "Confirm Quantity"} className="cursor-pointer bg-green-900 text-white rounded h-8 px-2" />
            {state.error ? <div className="text-red-600">{state.error}</div> : null}
            {state.message === "Success" ? <div className="text-green-900">{state.message}</div> : null}
            <input className="w-0 h-0" type="text" value={itemId} name="itemId" onChange={() => {}}/>
        </form>
    );
}