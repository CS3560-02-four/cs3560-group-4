export default function AccountButton({ handleClick, popupOpen }: { handleClick: Function, popupOpen: boolean }) {
    return (
        <button
            className={popupOpen ? "text-4xl bg-white text-green-950" : "text-4xl bg-green-950"}
            onClick={() => { handleClick(); }}>
            Account
        </button>
    );
}