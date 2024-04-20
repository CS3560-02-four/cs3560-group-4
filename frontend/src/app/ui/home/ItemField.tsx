import { Item } from "../../lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ItemField({ item, accountId } : { item: Item, accountId: number }) {
    return (
        <div className="border border-green-900 border-solid border-10">
            <Image src="" alt="Item image" width={50} height={50}/>
            <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
            </div>
            <div className="flex gap-5">
                <AddToCartButton accountId={accountId} item={item} />
            </div>
        </div>
    );
}