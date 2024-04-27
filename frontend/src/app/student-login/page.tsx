'use server';
import StudentLogin from "../ui/student/StudentLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    //Check if there's an active session in the browser
    if (cookies().has('account')) {
        //If true, redirect to student page
        redirect("/student");
    }

    //Display login form
    return (
        <div className="flex w-[100vw] h-[100vh] justify-center items-center">
            <StudentLogin />
        </div>
    );
}