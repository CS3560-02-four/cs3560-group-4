'use client';

import { useState } from "react";

export default function CartButton({ handleClickProp } : { handleClickProp: Function }) {
    const [cartWidgetOpen, setCartWidgetOpen] = useState(false);

    function handleClick() {
        setCartWidgetOpen(!cartWidgetOpen);
        handleClickProp();
    }

    return (
        <button className={cartWidgetOpen ? "text-green-800 bg-white text-4xl" : "text-white text-4xl"} onClick={handleClick}>
            Cart
        </button>
    );
}