'use server';
import { fetchAllRentals } from "@/app/lib/data";
import { AdminRental } from "@/app/lib/interfaces";
import AdminRentalField from "@/app/ui/admin/admin-rentals/AdminRentalField";

export default async function Page() {
    const response = await fetchAllRentals();
    const rentals: Array<AdminRental> = response.data;
    return (
        <div className="relative top-32 flex justify-center">
            <div className="flex flex-col w-[60%] gap-9">
                {rentals.map((rental: AdminRental) => <AdminRentalField key={rental.id} adminRental={rental} />)}
            </div>
        </div>
    );
}