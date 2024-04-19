'use server';

import { FormState } from "./interfaces";
import { authenticateUser } from "./data";
import { login, logout } from "./utils";
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
    if (accountData.accountId) {
        login(accountData.accountId);
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
    redirect("student-login");
}

export async function confirmRentalAction(formState: FormState, formData: FormData): Promise<FormState> {
    //confirm rental
    return {
        message: "Rental Confirmed"
    };
}