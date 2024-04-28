'use server';
import { fetchAllItemsAdmin } from "@/app/lib/data";
import { Item } from "@/app/lib/interfaces";
import { cookies } from "next/headers";
import AdminItemField from "@/app/ui/admin/admin-inventory/AdminItemField";
import { redirect } from "next/navigation";
import NewItemForm from "@/app/ui/admin/admin-inventory/NewItemForm";

export default async function Page() {
    const response = await fetchAllItemsAdmin();
    const items: Array<Item> = response.data;
    if (cookies().has('admin')) {
        return (
            <div className="relative top-32 flex justify-between px-20">
                <div className="flex flex-col gap-9 w-[60%]">
                    {items.filter((item: Item) => item.inventoryQuantity !== 0).map((item: Item) => <AdminItemField key={item.id} item={item} />)}
                </div>
                <NewItemForm />
            </div>
        );
    }
    else {
        redirect("/admin-login");
    }
}