'use server';

import StudentLogin from "../ui/StudentLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    return <StudentLogin />;
}