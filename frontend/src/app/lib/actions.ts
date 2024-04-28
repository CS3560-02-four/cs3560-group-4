'use server';

import { FormState } from "./interfaces";
import { addToCart, authenticateUser, cancelRental, confirmRental, fetchAccountData, authenticateAdmin, changeInventoryQuantity } from "./data";
import { login, logout, getAccountId, loginAdmin } from "./cookies";
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

export async function logoutAdmin() {
    logout();
    redirect("/admin-login");
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

    redirect("/student/account");
}

export async function authenticateAdminAction(formState: FormState, formData: FormData): Promise<FormState> {
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
        return {
            error: "Username or password is missing.",
        };
    }

    const response = await authenticateAdmin(username.toString(), password.toString());
    if (response.error) {
        return {
            error: "Failed to authenticate user."
        };
    }
    else {
        const accountData = response.data;
        loginAdmin(accountData.account_id);
        redirect("/admin");
    }
}

export async function updateInventoryQuantityAction(formState: FormState, formData: FormData): Promise<FormState> {
    const quantity = formData.get("quantity")?.toString();
    const itemId = formData.get("itemId")?.toString();

    if (!quantity) {
        return {
            error: "Please enter the item quantity."
        };
    }

    if (itemId !== undefined && quantity !== undefined) {
        const itemIdInt = parseInt(itemId);
        const quantityInt = parseInt(quantity);
        const response = await changeInventoryQuantity(itemIdInt, quantityInt);
        console.log(response);
        if (response === 200) {
            return {
                message: "Success"
            };
        }
        else {
            return {
                error: "Item quantity too low."
            };
        }
    }
    else {
        return {
            error: "An error occured. Please try again."
        };
    }
}