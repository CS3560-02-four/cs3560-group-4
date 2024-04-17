export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <p className="bg-green-950 text-white">Layout element</p>
            {children}
        </div>
    );
}