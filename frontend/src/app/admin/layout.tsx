import AdminNavbar from "../ui/admin/admin-navbar/AdminNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return(
        <div>
            <AdminNavbar />
            {children}
        </div>
    );
}