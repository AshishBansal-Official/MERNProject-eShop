import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="h-screen w-full overflow-x-hidden">
            <div className="flex flex-col h-full">
                <Header></Header>
                <div className="flex-1 bg-slate-100">
                    <Toaster />
                    <Outlet />
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default RootLayout;
