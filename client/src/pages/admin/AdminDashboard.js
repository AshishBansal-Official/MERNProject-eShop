import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-10 app-md:gap-6">
            <div className="text-4xl text-primary mb-2">Admin Panel</div>
            <div className="flex gap-6 app-md:gap-4">
                <div className="border-2 border-primary rounded-md shadow-xl">
                    <Link
                        to="create-category"
                        className="h-52 w-52 app-md:h-40 app-md:w-40 app-md:m-2 flex flex-col justify-center items-center  cursor-pointer hover:scale-105 duration-300"
                    >
                        {/* BiCategory from react-icons */}
                        <div className="w-40 h-40 text-primary">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="w-40 h-40 text-primary"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
                            </svg>
                        </div>
                        <div className="font-bold text-xl text-primary">
                            Category
                        </div>
                    </Link>
                </div>
                <div className="border-2 border-primary rounded-md shadow-xl">
                    <Link
                        to="product"
                        className="h-52 w-52 app-md:h-40 app-md:w-40 app-md:m-2 flex flex-col justify-center items-center  cursor-pointer hover:scale-105 duration-300"
                    >
                        {/* MdOutlineProductionQuantityLimits from react-icons */}
                        <div className="w-40 h-40 text-primary">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="w-40 h-40 text-primary"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M13 10h-2V8h2v2zm0-4h-2V1h2v5zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03L21 4.96 19.25 4l-3.7 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"></path>
                            </svg>
                        </div>
                        <div className="font-bold text-xl text-primary">
                            Product
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
