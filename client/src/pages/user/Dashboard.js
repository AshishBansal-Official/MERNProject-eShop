import { BsCartCheck } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-10 app-md:p-6">
            <div className="text-4xl text-primary mb-2">Dashboard</div>
            <div className="flex gap-6 app-md:gap-4">
                <div className="border-2 border-primary rounded-md shadow-xl">
                    <Link
                        to="profile"
                        className="h-52 w-52 app-md:h-40 app-md:w-40  flex flex-col justify-center items-center app-md:m-2 cursor-pointer hover:scale-105 duration-300"
                    >
                        <CgProfile className="w-40 h-40 text-primary" />
                        <div className="font-bold text-xl text-primary">
                            Profile
                        </div>
                    </Link>
                </div>
                <div className="border-2 border-primary rounded-md shadow-xl">
                    <Link
                        to="orders"
                        className="h-52 w-52 app-md:h-40 app-md:w-40 app-md:m-2 flex flex-col justify-center items-center  cursor-pointer hover:scale-105 duration-300"
                    >
                        <BsCartCheck className="w-40 h-40 text-primary" />
                        <div className="font-bold text-xl text-primary">
                            Orders
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
