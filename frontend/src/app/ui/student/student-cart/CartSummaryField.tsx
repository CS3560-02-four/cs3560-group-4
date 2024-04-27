'use client';
import { useFormState, useFormStatus } from "react-dom";
import { confirmRentalAction } from "@/app/lib/actions";

export default function CartSummaryField({ accountStatus }: { accountStatus: string }) {
    const status = useFormStatus();
    const [state, action] = useFormState(confirmRentalAction, { message: "", error: "" });
    
    const form = <form action={action} className="flex flex-col shadow-md gap-4 p-5 justify-between">
        <div className="text-green-900 text-xl">Pick your pickup and return time.</div>
        <div className="flex flex-col gap-2">
            <label htmlFor="pickup">Pickup Time</label>
            <input type="datetime-local" name="pickup" />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="return">Return Time</label>
            <input type="datetime-local" name="return" />
        </div>
        {state.error ? <div className="text-red-600">{state.error}</div> : null}
        <input type="submit" value={status.pending ? "Confirming..." : "Confirm Rental"} className="bg-green-900 text-white rounded text-sm p-2 font-medium cursor-pointer" />
    </form>;

    return ( // form
        //Pickup datetime field
        //Return datetime field
        //Confirm rental button
        <div>
            {accountStatus === "normal" ? form : <div className="text-red-600">You are unable to make a rental reservation as your account is currently on hold.</div>}
        </div>
    );
}