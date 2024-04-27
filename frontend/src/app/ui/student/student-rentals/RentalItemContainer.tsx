import { ItemUnit } from "@/app/lib/interfaces";
import RentalItemField from "./RentalItemField";

export default function RentalItemContainer({ items }: { items: Array<ItemUnit> }) {
    return (
        <div className="flex justify-center pt-4">
            <div className="flex flex-col gap-6 w-[50%]">
                {items.map((item: ItemUnit) => <RentalItemField item={item} />)}
            </div>
        </div>
    );
}