'use client';
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateBalanceAction } from "@/app/lib/actions";

export default function NewBalanceForm({ accountId }: { accountId: string }) {
    const [balance, setBalance] = useState();
    const status = useFormStatus();
    const [state, action] = useFormState(updateBalanceAction, { message: "", error: "" });

    function onChangeBalance(event: any) {
        const newBalance = event.target.value;
        setBalance(newBalance);
    }
    return (    
    <form action={action} className="flex flex-col gap-4 shadow-md rounded p-5">
        <div className="text-3xl font-medium text-green-900 self-center">Account #{accountId}</div>
        <label htmlFor="balance" className="text-green-900 text-2xl">New Account Balance (format e.eg 0.00):</label>
        <input placeholder="0.00" type="text" name="balance" pattern="\d+\.\d{2}" value={balance} onChange={onChangeBalance} className="text-green-900 text-2xl shadow-md p-4" />
        {state.error ? <div className="text-red-600 text-xl">{state.error}</div> : null}
        <input type="submit" value={status.pending ? "Confirming..." : "Confirm"} className="cursor-pointer bg-green-900 text-white rounded h-8 px-2" />
        <input className="w-0 h-0" type="text" value={accountId} name="accountId" onChange={() => {}}/>
    </form>
    );
}