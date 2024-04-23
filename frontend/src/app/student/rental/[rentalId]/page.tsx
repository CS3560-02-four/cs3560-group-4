import { getAccountId, logout } from "@/app/lib/cookies";
import { getRental } from "@/app/lib/data";
import RentalItemContainer from "@/app/ui/rentals/RentalItemContainer";
import { redirect } from "next/navigation";
import { Rental } from "@/app/lib/interfaces";

export default async function Page({ params }: { params: { rentalId: string }}) {
    const accountIdCookieValue = getAccountId();
    if (accountIdCookieValue !== undefined) {
        const response = await getRental(parseInt(params.rentalId));
        const rental: Rental = response.data;
        return (
            <div>
                <div>Rental {rental.id}</div>
                {<div>Status: {rental.status}</div>}
                {rental.status === "reserved" ? <button className="bg-red-700 text-white rounded text-sm p-2 font-medium">Cancel Rental Reservation</button> : null}
                {/* {rental.itemUnits ? <RentalItemContainer items={rental.itemUnits}/> : null} */}
            </div>
        );
    }
    else {
        logout();
        redirect("/student-login");
    }
}