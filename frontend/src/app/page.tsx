'use server';

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  //Admin page is not done yet so redirect to student login page
  redirect("/student-login");
  return (
    <div>
      <Link href="/student-login">Login as Student</Link>
      <Link href="">Login as Admin</Link>
    </div>
  );
}