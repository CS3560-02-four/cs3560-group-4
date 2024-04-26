import { Item } from "../../lib/interfaces";
import AddToCartButton from "./AddToCartButton";

export default function ItemField({ item, accountId } : { item: Item, accountId: number }) {
    return (
        <div className="rounded shadow-md p-4 flex flex-col gap-3">
            <div>
                <div className="text-green-900 text-2xl font-medium">{item.name}</div>
                <div>{item.description}</div>
            </div>
            <div className="flex gap-5">
                <AddToCartButton accountId={accountId} item={item} />
            </div>
        </div>
    );
}