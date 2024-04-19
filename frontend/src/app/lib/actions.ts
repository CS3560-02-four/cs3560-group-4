'use server';

import { FormState } from "./interfaces";
import { authenticateUser } from "./data";
import { login } from "./utils";
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
        login(response.accountId);
        redirect("/student");
    }
    else {
        return {
            error: "Failed to authenticate user."
        }
    }
}

export async function updateCartItemQuantityAction(cartItemId: number, quantity: number) {
    console.log(`Quantity of item ${cartItemId} updated to ${quantity}.`);
}

export async function removeCartItemAction(cartItemId: number) {
    console.log(`Removed item ${cartItemId} from cart.`);
}

export async function confirmRentalAction(formState: FormState, formData: FormData): Promise<FormState> {
    //confirm rental
    return {
        message: "Rental Confirmed"
    };
}