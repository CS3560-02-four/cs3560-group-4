'use client';
import { useFormState } from "react-dom";
import { useState } from "react";
import { createInventoryItemAction } from "@/app/lib/actions";

export default function NewItemForm() {
    const [state, action] = useFormState(createInventoryItemAction, { message: "", error: "" });
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [category, setCategory] = useState("Laptops");

    function onNameChange(event: any) {
        const newName = event.target.value;
        setName(newName);
    }

    function onDescriptionChange(event: any) {
        const newDescription = event.target.value;
        setDescription(newDescription);
    }

    function onQuantityChange(event: any) {
        const newQuantity = event.target.value;
        setQuantity(newQuantity);
    }

    function onCategoryChange(event: any) {
        const newCategory = event.target.value;
        setCategory(newCategory);
    }

    return (
        <form action={action} className="flex flex-col gap-4 shadow-md px-5 py-7 fixed left-[75%]">
            <div className="self-center text-2xl text-green-900 font-medium">Add an Item</div>
            <input className="p-2 shadow-md" type="text" placeholder="Item Name" value={name} onChange={onNameChange} name="name" />
            <textarea className="resize-none p-2 shadow-md" cols={30} rows={8} placeholder="Item Description" onChange={onDescriptionChange} name="description">{description}</textarea>
            <div className="flex gap-5 self-center">
                <label htmlFor="quantity">Quantity:</label>
                <input className="w-5 text-center shadow-md rounded text-[17px]" type="text" value={quantity} onChange={onQuantityChange} name="quantity" />
            </div>
            <div className="flex gap-5 self-center">
                <label htmlFor="category">Category:</label>
                <select name="category" className="text-green-900" value={category} onChange={onCategoryChange}>
                    <option value="Laptops">Laptops</option>
                    <option value="Calculators">Calculators</option>
                    <option value="Headsets">Headsets</option>
                    <option value="Chargers">Chargers</option>
                    <option value="Mice">Mice</option>
                </select>
            </div>
            {state?.error ? <div className="text-red-600">{state.error}</div> : null}
            <input type="submit" value="Submit" className="bg-green-900 text-white rounded text-sm p-2 font-medium cursor-pointer" />
        </form>
    );
}