import Link from "next/link";

//This page will be used as the login page implemented later, for now just a link redirecting to the homepage
export default function Page() {
  return (
    <Link href="./student-home">Home Page</Link>
  );
}