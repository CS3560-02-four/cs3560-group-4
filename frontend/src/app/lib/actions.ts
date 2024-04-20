'use server';

import { FormState } from "./interfaces";
import { authenticateUser, confirmRental, fetchCartItems } from "./data";
import { login, logout } from "./cookies";
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
    const accountData = response.data;
    if (accountData.account_id) {
        login(accountData.account_id);
        redirect("/student");
    }
    else {
        return {
            error: "Failed to authenticate user."
        }
    }
}

export async function logoutAction() {
    logout();
    redirect("/student-login");
}

//finish this later to work with FormData
export async function confirmRentalAction(accountId: number) {
    await confirmRental(accountId);
    redirect("/student");
}