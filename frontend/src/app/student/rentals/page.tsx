import { logoutAction } from "@/app/lib/actions";
import { getRentals } from "@/app/lib/data";
import { DataResponse, Rental } from "@/app/lib/interfaces";
import { getAccountId, logout } from "@/app/lib/cookies";
import RentalContainer from "@/app/ui/rentals/RentalContainer";
import { redirect } from "next/navigation";

export default async function Page() {
    const accountIdCookieValue = getAccountId();
    if (accountIdCookieValue !== undefined) {
        const response: DataResponse = await getRentals(parseInt(accountIdCookieValue));
        const rentals: Array<Rental> = response.data;
        return (
            <RentalContainer rentals={rentals} />
        );
    }
    else {
        logoutAction();
    }
}