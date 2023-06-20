import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
    return (
        <div className="h-screen w-full overflow-x-hidden">
            <div className="flex flex-col h-full">
                <Header></Header>
                <div className="flex-1 bg-slate-100">Something went wrong</div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default RootLayout;
