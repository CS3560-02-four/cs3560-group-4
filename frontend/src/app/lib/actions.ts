'use server';

import { FormState } from "./interfaces";
import { authenticateUser } from "./data";
import { createSession } from "./utils";
import { redirect } from "next/navigation";

export async function authenticateUserAction(formState: FormState, formData: FormData): Promise<FormState> {
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
        return {
            error: "Username or password is missing.",
        }
    }

    const response = await authenticateUser(username.toString(), password.toString());
    if (response.accountId) {
        createSession(response.accountId);
        redirect("/student");
    }
    else {
        return {
            error: "Failed to authenticate user."
        }
    }
}