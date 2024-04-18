import { redirect } from "next/navigation";

export default function Page() {

    redirect('/student-home');

    return (
        <div></div>
    );
}