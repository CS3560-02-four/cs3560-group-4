export default function CartButton({ handleClick, cartOpen }: { handleClick: Function, cartOpen: boolean }) {
    return (
        <button
            className={cartOpen ? "text-4xl bg-white text-green-950" : "text-4xl bg-green-950"}
            onClick={() => { handleClick(); }}>
            Cart
        </button>
    );
}