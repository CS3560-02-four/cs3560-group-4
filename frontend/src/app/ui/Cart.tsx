'use client';

import CartButton from "./CartButton";
import { useState } from "react";

export default function Cart() {
    const [cartWidgetOpen, setCartWidgetOpen] = useState(false);

    function openCart() {
        setCartWidgetOpen(!cartWidgetOpen)
    }

    return (
        <div>
            <CartButton handleClickProp={openCart} />
            {/*Test Opening Cart*/}
            <div className="text-9xl text-red">
                {cartWidgetOpen ? <div>Open</div> : <div>Not Open</div>}
            </div>
        </div>
    );
}