import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useUiStore } from "../../store/uiStore";
import styles from "./Layout.module.css";

export default function MainLayout() {
    const sidebarOpen = useUiStore((state) => state.sidebarOpen);
    const closeSidebar = useUiStore((state) => state.closeSidebar);

    return (
        <div className={styles.wrapper}>
            <Navbar />

            <div className={styles.body}>
                <Sidebar />

                <main
                    className={styles.content}
                    onClick={() => sidebarOpen && closeSidebar()}
                >
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
}