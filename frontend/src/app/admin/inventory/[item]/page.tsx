'use server';
import { fetchItemUnits } from "@/app/lib/data";
import { DataResponse, ItemUnit} from "@/app/lib/interfaces";
import ItemUnitField from "@/app/ui/admin/admin-inventory/ItemUnitField";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { item: string } }) {
    const response: DataResponse = await fetchItemUnits(params.item);
    const [item, itemUnits] = response.data;
    if (cookies().has('admin')) {
        return (
            <div className="relative top-32 flex flex-col items-center gap-5">
                <div className="text-3xl font-medium text-green-900">{item.name}</div>
                <div className="flex gap-10 justify-center text-xl text-green-900">
                    <div>Item ID: {item.id}</div>
                    <div>Category: {item.category}</div>
                </div>
                <div className="w-[40%] text-center text-lg">
                    {item.description}
                </div>
                <div className="flex flex-col gap-9 w-[60%]">
                    {/**Map item units here*/}
                    {itemUnits.map((unit: ItemUnit) => <ItemUnitField key={unit.id} itemUnit={unit} />)}
                </div>
            </div>
        );
    }
    else {
        redirect("/admin-login");
    }
}