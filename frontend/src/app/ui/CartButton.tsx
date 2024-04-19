import Link from "next/link";

export default function CartButton() {
    return (
        <Link href="/student/cart">
            <button>
                Cart
            </button>
        </Link>
    );
}