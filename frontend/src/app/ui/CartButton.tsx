import Link from "next/link";

export default function CartButton() {
    return (
        <Link href="/student/cart">
            <button className="bg-white text-green-900 rounded text-xl p-2 font-medium">
                Cart
            </button>
        </Link>
    );
}