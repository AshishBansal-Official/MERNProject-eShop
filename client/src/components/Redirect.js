import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "./Spinner.js";

const Redirect = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue);
        }, 1000);
        count === 0 &&
            navigate(`/${path}`, {
                state: location.pathname,
            });
        return () => {
            clearInterval(interval);
        };
    }, [count, navigate, location, path]);
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="text-3xl">Redirecting in {count} seconds</div>
            <Spinner className="h-8 mt-4" />
        </div>
    );
};

export default Redirect;
