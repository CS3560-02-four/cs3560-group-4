import Link from "next/link";;

export default function Page() {
  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <div className="flex flex-col gap-4 items-center">
        <div className="text-5xl text-green-900">Cal Poly Pomona</div>
        <div className="text-2xl">Computer Science Department Rental Service</div>
        <div className="flex gap-5">
          <Link href="/student-login"><button className="bg-green-900 text-white rounded text-l p-2 font-medium">Login as Student</button></Link>
          <Link href="/admin-login"><button className="bg-green-900 text-white rounded text-l p-2 font-medium">Login as Admin</button></Link>
        </div>
      </div>
    </div>
  );
}