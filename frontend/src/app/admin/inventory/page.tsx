'use server';
import { logoutAdmin } from "@/app/lib/actions";
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
            <div>
                {items.map((item: Item) => <AdminItemField item={item} />)}
            </div>
        );
    }
    else {
        redirect("/admin-login");
    }
}