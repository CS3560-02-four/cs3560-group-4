'use server';

import { FormState } from "./interfaces";
import { addToCart, authenticateUser, confirmRental, fetchAccountData } from "./data";
import { login, logout, getAccountId } from "./cookies";
import { redirect } from "next/navigation";

export async function authenticateUserAction(formState: FormState, formData: FormData): Promise<FormState> {
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
        return {
            error: "Username or password is missing.",
        };
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
        };
    }
}

export async function logoutAction() {
    logout();
    redirect("/student-login");
}

//add error handling
export async function confirmRentalAction(formState: FormState, formData: FormData): Promise<FormState> {
    console.log(formData);
    const pickupDatetime = formData.get("pickup");
    const returnDatetime = formData.get("return");
    if (!pickupDatetime || !returnDatetime) {
        return {
            error: "Please pick your pickup and return times."
        };
    }

    const accountIdCookieValue = getAccountId();
    if (accountIdCookieValue !== undefined) {
        const accountId = parseInt(accountIdCookieValue);
        await confirmRental(accountId, pickupDatetime.toString(), returnDatetime.toString());
    }

    return {
        message: "Successfully submitted rental."
    }
}