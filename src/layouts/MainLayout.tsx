import { Outlet } from "react-router-dom";
import Nav from "../componants/Nav";
import Footer from "../componants/Footer";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#FFFDF6]">
            <Nav />

            <main className="flex-1">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default MainLayout;