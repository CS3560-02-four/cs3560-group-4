import { getAccountId, logout } from "@/app/lib/cookies";
import { cancelRental, getRental } from "@/app/lib/data";
import RentalItemContainer from "@/app/ui/student/student-rentals/RentalItemContainer";
import { redirect } from "next/navigation";
import { Rental } from "@/app/lib/interfaces";
import RentalTitleField from "@/app/ui/student/student-rentals/RentalTitleField";
import { formatDatetime } from "@/app/lib/utils";

export default async function Page({ params }: { params: { rentalId: string }}) {
    const accountIdCookieValue = getAccountId();
    if (accountIdCookieValue !== undefined) {
        const response = await getRental(parseInt(params.rentalId));
        const rental: Rental = response.data;
        if (rental.status !== "active" && rental.status !== "reserved") {
            redirect("/student/account");
        }
        else {
            return (
                <div className="relative top-32">
                    <RentalTitleField rentalId={rental.id} rentalStatus={rental.status} pickupDatetime={formatDatetime(rental.pickupDatetime)} returnDatetime={formatDatetime(rental.returnDatetime)} />
                    {rental.itemUnits ? <RentalItemContainer items={rental.itemUnits}/> : null}
                </div>
            );
        }
    }
    else {
        logout();
        redirect("/student-login");
    }
}