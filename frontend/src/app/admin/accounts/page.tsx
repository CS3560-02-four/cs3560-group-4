'use server';
import { fetchAllAccounts } from "@/app/lib/data";
import { Account, DataResponse } from "@/app/lib/interfaces";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminAccountField from "@/app/ui/admin/admin-accounts/AdminAccountField";

export default async function Page() {

    //function to dispolay accounts on hold before accounts without hold
    function sortFn(a: Account, b: Account) {
        if (a.status === "hold" && b.status === "normal") {
            return -1; // "hold" comes before "normal"
        } else if (a.status === "normal" && b.status === "hold") {
            return 1; // "normal" comes after "hold"
        } else {
            return 0; // no need to change order
        }
    }

    const response: DataResponse = await fetchAllAccounts();
    const accounts: Array<Account> = response.data;
    if (cookies().has('admin')) {
        return (
            <div className="relative top-32 flex justify-center">
                <div className="flex flex-col items-center gap-5 w-[50%]">
                    {accounts.sort(sortFn).map((account: Account) => <AdminAccountField key={account.id} account={account} />)}
                </div>
            </div>
        );
    }
    else {
        redirect("/admin-login");
    }
}