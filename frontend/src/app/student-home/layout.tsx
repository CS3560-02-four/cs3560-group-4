import Link from "next/link";
import Cart from "../ui/Cart";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="bg-green-950 text-white h-[100px] flex justify-between">
                <Link href="/student-home" className="text-6xl">Cal Poly Pomona</Link>
                <div className="flex gap-10">
                    <h3 className="text-4xl">User</h3>
                    <Cart />
                </div>
            </div>
            {children}
        </div>
    );
}