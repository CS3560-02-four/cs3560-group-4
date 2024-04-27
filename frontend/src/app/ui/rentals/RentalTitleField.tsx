'use client';
import { useRouter } from "next/navigation";
import { cancelRental } from "@/app/lib/data";

export default function RentalTitleField({ rentalId, rentalStatus, pickupDatetime, returnDatetime }: { rentalId: number, rentalStatus: string, pickupDatetime: string, returnDatetime: string }) {
    const router = useRouter();

    function onCancelRental() {
        cancelRental(rentalId);
        router.refresh();
    }

    return (
        <div className="flex items-center flex-col gap-5">
            <div className="flex gap-5">
                <div className="text-xl text-green-900 font-medium">Rental {rentalId}</div>
                <div className="text-xl text-green-900 font-medium">Status: {rentalStatus[0].toUpperCase()}{rentalStatus.slice(1)}</div>
                {rentalStatus === "reserved" ? <button className="bg-red-700 text-white rounded text-xl p-2 font-medium" onClick={onCancelRental}>Cancel Rental Reservation</button> : null}
            </div>
            <div className="text-green-900 font-medium">
                <div>Pickup: {pickupDatetime}</div>
                <div>Return: {returnDatetime}</div>
            </div>
        </div>
    );
}  