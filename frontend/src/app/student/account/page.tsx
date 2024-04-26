import { logoutAction } from "@/app/lib/actions";
import { fetchAccountData, getRentals } from "@/app/lib/data";
import { DataResponse, Rental, Account } from "@/app/lib/interfaces";
import { getAccountId } from "@/app/lib/cookies";
import RentalContainer from "@/app/ui/account/RentalContainer";
import AccountInfoField from "@/app/ui/account/AccountInfoField";

export default async function Page() {
    const accountIdCookieValue = getAccountId();
    if (accountIdCookieValue !== undefined) {
        const rentalsResponse: DataResponse = await getRentals(parseInt(accountIdCookieValue)); 
        const accountResponse: DataResponse = await fetchAccountData(parseInt(accountIdCookieValue));
        const rentals: Array<Rental> = rentalsResponse.data;
        const account: Account = accountResponse.data;
        return (
            <div className={rentals.length !== 0 ? "relative top-32 left-24 flex gap-[500px]" : "relative top-32 flex justify-center items-center flex-col gap-9"}>
                {rentals.length !== 0 ? <RentalContainer rentals={rentals} /> : <div>No rentals have been created for this account yet.</div>}
                <AccountInfoField account={account} />
            </div>
        );
    }
    else {
        logoutAction();
    }
}