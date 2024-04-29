'use server';

import { getRental } from "@/app/lib/data";
import { DataResponse, ItemUnit, Rental } from "@/app/lib/interfaces";
import AdminRentalItemField from "@/app/ui/admin/admin-rentals/AdminRentalItemField";

export default async function Page({ params }: { params: { rental: string } }) {
    const response: DataResponse = await getRental(parseInt(params.rental));
    const rental: Rental = response.data;
    return (
        <div>
            {rental.itemUnits?.map((unit: ItemUnit) => <AdminRentalItemField key={unit.id} itemUnit={unit} />)}
        </div>
    );
}