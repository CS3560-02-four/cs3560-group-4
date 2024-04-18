'use client';

import { authenticateUser } from "../lib/data";
import { redirect } from "next/navigation";

export default function StudentLogin() {
    async function authenticateUserAction(formData: FormData) {
        const username = formData.get("username");
        const password = formData.get("password");

        if (username === null || password === null) {
            throw new Error("Username or password is missing.");
        }

        const accountId = await authenticateUser(username.toString(), password.toString());

        if (accountId > -1) {
            redirect(`/student-home/${accountId}`);
        }

    }

    return (
        <form action="">

        </form>
    );
}