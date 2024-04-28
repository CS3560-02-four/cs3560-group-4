'use server';
import { fetchAllItemsAdmin } from "@/app/lib/data";
import { Item } from "@/app/lib/interfaces";
import { cookies } from "next/headers";
import AdminItemField from "@/app/ui/admin/admin-inventory/AdminItemField";
import { redirect } from "next/navigation";

export default async function Page() {
    const response = await fetchAllItemsAdmin();
    const items: Array<Item> = response.data;
    if (cookies().has('admin')) {
        return (
            <div className="relative top-32">
                <div className="flex flex-col gap-9 w-[60%]">
                    {items.map((item: Item) => <AdminItemField key={item.id} item={item} />)}
                </div>
            </div>
        );
    }
    else {
        redirect("/admin-login");
    }
}