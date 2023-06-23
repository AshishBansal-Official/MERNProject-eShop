import React from "react";
import { Link } from "react-router-dom";

const DashboardCard = ({ icon, title, to = "/" }) => {
    return (
        <div className="border-2 border-primary rounded-md shadow-xl">
            <Link
                to={to}
                className="m-2 flex flex-col justify-center items-center cursor-pointer hover:scale-105 duration-300"
            >
                <div className="w-32 h-32 text-primary">{icon}</div>
                <div className="font-bold text-xl text-primary">{title}</div>
            </Link>
        </div>
    );
};

export default DashboardCard;
