'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page() {
    const pathname = usePathname();

    return (
        <div>
            <h1>Cal Poly Pomona Rental Service - CS Department</h1>
            <Link href={`${pathname}/item`}>Test item link</Link>
        </div>
    );
}