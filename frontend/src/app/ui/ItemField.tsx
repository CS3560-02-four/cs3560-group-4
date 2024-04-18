import { Item } from "../lib/interfaces";
import Image from "next/image";
import Link from "next/link";

export default function ItemField({ item } : { item: Item }) {
    return (
        <div className="border border-green-900 border-solid border-10">
            <Image src="" alt="Item image" width={50} height={50}/>
            <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
            </div>
            <div className="flex gap-5">
                <button className="h-4 w-10 bg-green-950 text-white">
                    Add To Cart
                </button>
                <Link href={`/student-home/item/${item.id}`} className="h-4 w-10 bg-green-950 text-white">
                    Details
                </Link>
            </div>
        </div>
    );
}