'use server';

import { getRental } from "@/app/lib/data";
import { DataResponse, ItemUnit, Rental } from "@/app/lib/interfaces";
import AdminRentalItemField from "@/app/ui/admin/admin-rentals/AdminRentalItemField";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { rental: string } }) {
    const response: DataResponse = await getRental(parseInt(params.rental));
    const rental: Rental = response.data;
    if (cookies().has('admin')) {
        return (
            <div className="relative top-32 flex flex-col items-center gap-5">
                <div className="flex flex-col gap-9 w-[60%]">
                    {rental.itemUnits?.map((unit: ItemUnit) => <AdminRentalItemField key={unit.id} itemUnit={unit} />)}
                </div>
            </div>
        );
    }
    else {
        redirect("/admin-login");
    }
}