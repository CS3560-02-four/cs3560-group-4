'use client';

import { useFormState, useFormStatus } from "react-dom";
import { authenticateUserAction } from "../lib/actions";

export default function StudentLogin() {
    const status = useFormStatus();
    const [state, action] = useFormState(authenticateUserAction, { message: "", error: "" });

    const inputFieldStyle = {
        border: state.error ? "2px solid red" : "2px solid black",
        color: state.error ? "red" : "black"
    };

    return (
        <form action={action}>
            <input type="text" placeholder="Username" name="username" style={inputFieldStyle} />
            <input type="password" placeholder="Password" name="password" style={inputFieldStyle} />
            {state.error ? <h4>{state.error}</h4> : null}
            <input type="submit" value={status.pending ? "Logging in" : "Login"} />
        </form>
    );
}