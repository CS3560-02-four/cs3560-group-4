import { ItemUnit } from "@/app/lib/interfaces";
import RentalItemField from "./RentalItemField";

export default function RentalItemContainer({ items }: { items: Array<ItemUnit> }) {
    return (
        <div>
            <div>
                {items.map((item: ItemUnit) => <RentalItemField item={item} />)}
            </div>
        </div>
    );
}