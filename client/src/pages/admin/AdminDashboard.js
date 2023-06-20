import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
// import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-10">
            <div className="text-4xl text-primary mb-2">Admin Panel</div>
            <div className="flex gap-4">
                <Link
                    to="create-category"
                    className="h-52 w-52 border-2 border-primary rounded-md shadow-xl flex flex-col justify-center items-center  cursor-pointer hover:scale-105 duration-300"
                >
                    <BiCategory className="w-40 h-40 text-primary" />
                    <div className="font-bold text-xl text-primary">
                        Category
                    </div>
                </Link>
                <Link
                    to="product"
                    className="h-52 w-52 border-2 border-primary rounded-md shadow-xl flex flex-col justify-center items-center  cursor-pointer hover:scale-105 duration-300"
                >
                    <MdOutlineProductionQuantityLimits className="w-40 h-40 text-primary" />
                    <div className="font-bold text-xl text-primary">
                        Product
                    </div>
                </Link>
                {/* <Link
                    to="users"
                    className="h-52 w-52 border-2 border-primary rounded-md shadow-xl flex flex-col justify-center items-center  cursor-pointer hover:scale-105 duration-300"
                >
                    <FaUsers className="w-40 h-40 text-primary" />
                    <div className="font-bold text-xl text-primary">Users</div>
                </Link> */}
            </div>
        </div>
    );
};

export default AdminDashboard;
