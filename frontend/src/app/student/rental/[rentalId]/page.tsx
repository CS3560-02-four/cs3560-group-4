import RentalItemContainer from "@/app/ui/rentals/RentalItemContainer";

export default function Page({ params }: { params: { rentalId: string }}) {
    //fetch rental here
    //temp
    const rental = {
        status: ""
    }

    return (
        <div>
            <div>Rental {params.rentalId}</div>
            <div>Status: {rental.status}</div>
            {rental.status === "reserved" ? <button className="bg-red-700 text-white rounded text-sm p-2 font-medium">Cancel Rental Reservation</button> : null}
            {/*<RentalItemContainer items={}/>*/}
        </div>
    );
}