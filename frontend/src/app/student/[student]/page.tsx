'use server';

import { cookies } from "next/headers";
import { redirect} from "next/navigation";

export default async function Page({ params }: { params: { accountId: string } }) {
    const loggedInId = cookies().get('account')?.value;
    if (loggedInId === params.accountId) {
        return <h1>Logged in: {params.accountId}</h1>
    }
    else {
        redirect("/student");
    }
}