import { logoutAdmin } from "@/app/lib/actions";
import { fetchAllItemsAdmin } from "@/app/lib/data";
import { Item } from "@/app/lib/interfaces";
import { cookies } from "next/headers";
import AdminItemField from "@/app/ui/admin/admin-inventory/AdminItemField";

export default async function Page() {
    if (cookies().has('admin')) {
        const response = await fetchAllItemsAdmin();
        const items: Array<Item> = response.data;
        return (
            <div>
                {items.map((item: Item) => <AdminItemField item={item} />)}
            </div>
        );
    }
    else {
        logoutAdmin();
    }
}