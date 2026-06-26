import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function MainLayout() {
    return (
        <>
            <Navbar />

            <div style={{ display: "flex" }}>
                <Sidebar />

                <main style={{ flex: 1 }}>
                    <Outlet />
                </main>
            </div>

            <Footer />
        </>
    );
}