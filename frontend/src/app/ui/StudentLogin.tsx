'use client';

import { useFormState, useFormStatus } from "react-dom";
import { authenticateUserAction } from "../lib/actions";

export default function StudentLogin() {
    const status = useFormStatus();
    const [state, action] = useFormState(authenticateUserAction, { message: "", error: "" });

    const inputFieldStyle = {
        border: state.error ? "2px solid red" : "2px solid black",
    };

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="text-5xl text-green-900">Cal Poly Pomona</div>
            <div className="text-2xl">Computer Science Department Rental Service</div>
            <form action={action} className="flex flex-col gap-2">
                <input type="text" placeholder="Username" name="username" style={inputFieldStyle} className="rounded p-1" />
                <input type="password" placeholder="Password" name="password" style={inputFieldStyle} className="rounded p-1" />
                {state.error ? <div className="text-red-600">{state.error}</div> : null}
                <input type="submit" value={status.pending ? "Logging in..." : "Login"} className="cursor-pointer bg-green-900 text-white rounded h-8" />
            </form>
        </div>
    );
}