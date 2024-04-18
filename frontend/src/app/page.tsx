'use server';

import Link from "next/link";

//This page will be used as the login page implemented later, for now just a link redirecting to the homepage
export default async function Page() {
  return (
    <div>
      <Link href="/student-home">Login as Student</Link>
      <Link href="">Login as Admin</Link>
    </div>
  );
}