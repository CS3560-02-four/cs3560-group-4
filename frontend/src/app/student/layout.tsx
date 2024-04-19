'use server';
import StudentNavbar from "@/ui/StudentNavbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchAccountData } from "../../lib/data";
import { Account } from "../../lib/interfaces";
import { logout } from "../../lib/utils";

export default async function Layout({ children }: { children: React.ReactNode }) {
    //Check for active browser session
    if (cookies().has('account')) {
        const accountIdCookieValue = cookies().get('account')?.value;
        if (accountIdCookieValue !== undefined) {
            const accountId = parseInt(accountIdCookieValue);
            //fetch account data
            const response = await fetchAccountData(accountId);
            if (response.data) {
                return (
                    <div>
                        <StudentNavbar account={response.data} />
                        {children}
                    </div>
                );
            }
            else if (response.error) {
                //handle error
            }
        }
        else {
            //logout
            //redirect to login page
            logout();
            redirect("/student-login");
        }
    }   
    else {
        redirect("/student-login");
    }
}