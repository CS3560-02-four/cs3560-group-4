'use server';
import { fetchAllRentals } from "@/app/lib/data";
import { AdminRental } from "@/app/lib/interfaces";
import AdminRentalField from "@/app/ui/admin/admin-rentals/AdminRentalField";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const response = await fetchAllRentals();
    const rentals: Array<AdminRental> = response.data;
    if (cookies().has('admin')) {
        return (
            <div className="relative top-32 flex justify-center">
                <div className="flex flex-col w-[60%] gap-9">
                    {rentals.map((rental: AdminRental) => <AdminRentalField key={rental.id} adminRental={rental} />)}
                </div>
            </div>
        );
    }
    else {
        redirect("/admin-login");
    }
}