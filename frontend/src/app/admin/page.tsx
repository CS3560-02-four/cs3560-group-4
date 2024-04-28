import { cookies } from "next/headers";
import { logoutAdmin } from "../lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
    if (cookies().has('admin')) {
        return (
            <div className="flex justify-center items-center h-[100vh]">
                <div className="flex flex-col gap-5 w-96 items-center">
                    <div className="text-3xl text-green-900 font-medium">Admin Panel</div>
                    <Link href="/admin/inventory"><button className="text-white bg-green-900 rounded p-2 w-80">Inventory Management</button></Link>
                    <Link href="/admin/rentals"><button className="text-white bg-green-900 rounded p-2 w-80">Rental Management</button></Link>
                    <Link href="/admin/accounts"><button className="text-white bg-green-900 rounded p-2 w-80">Account Management</button></Link>
                </div>
            </div>
        );
    }
    else {
        redirect("/admin-login");
    }
}