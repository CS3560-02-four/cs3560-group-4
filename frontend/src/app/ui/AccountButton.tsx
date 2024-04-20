export default function AccountButton({ handleClick }: { handleClick: Function }) {
    return (
        <button
            className="bg-white text-green-900 rounded text-xl p-2 font-medium"
            onClick={() => { handleClick(); }}>
            Account
        </button>
    );
}