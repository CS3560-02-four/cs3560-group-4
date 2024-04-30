'use server';
import { cookies } from "next/headers";
import NewBalanceForm from "@/app/ui/admin/admin-accounts/NewBalanceForm";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { account: string } }) {
    if (cookies().has('admin')) {
        return (
            <div className="relative top-32 flex justify-center">
                <NewBalanceForm accountId={params.account} />
            </div>
        );
    }
    else {
        redirect("/admin-login");
    }
}