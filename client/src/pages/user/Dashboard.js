import { BsCartCheck } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-10 app-md:p-6">
            <div className="text-4xl text-primary mb-2">Dashboard</div>
            <div className="flex gap-6 app-md:gap-4">
                <Link
                    to="profile"
                    className="h-52 w-52 app-md:h-40 app-md:w-40 border-2 border-primary rounded-md shadow-xl flex flex-col justify-center items-center  cursor-pointer hover:scale-105 duration-300"
                >
                    <CgProfile className="w-40 h-40 text-primary" />
                    <div className="font-bold text-xl text-primary">
                        Profile
                    </div>
                </Link>
                <Link
                    to="orders"
                    className="h-52 w-52 app-md:h-40 app-md:w-40 border-2 border-primary rounded-md shadow-xl flex flex-col justify-center items-center  cursor-pointer hover:scale-105 duration-300"
                >
                    <BsCartCheck className="w-40 h-40 text-primary" />
                    <div className="font-bold text-xl text-primary">Orders</div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
