'use client';
import { changeAccountStatus } from "@/app/lib/data";
import { useRouter} from "next/navigation";

export default function AccountStatusButton({ accountId, status }: { accountId: number, status: string }) {
    const router = useRouter();

    function onPutOnHold() {
        changeAccountStatus(accountId, "hold");
        router.refresh();
    }

    function onRemoveHold() {
        changeAccountStatus(accountId, "normal");
        router.refresh();
    }

    return (
        <div>
            {status === "hold" ?
                <button className="text-white rounded text-l p-2 font-medium bg-yellow-600" onClick={onRemoveHold}>Remove Hold</button>
                :
                <button className="text-white rounded text-l p-2 font-medium bg-yellow-600" onClick={onPutOnHold}>Put Account on Hold</button>
            }
        </div>
    );
}