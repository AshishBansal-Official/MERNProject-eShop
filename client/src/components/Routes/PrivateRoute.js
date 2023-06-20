import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import api from "../../utils/api";
import Redirect from "../Redirect";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            setLoading(true);
            try {
                const res = await api.get("auth/user-auth");
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
                setLoading(false);
            } catch (error) {
                setAuth({
                    ...auth,
                    user: null,
                    token: "",
                });
                localStorage.removeItem("auth");
                toast.error(error.message + ": " + error.response.statusText);
                toast.error("User Logged out");
                setLoading(false);
            }
        };
        if (auth?.token) authCheck();
        // eslint-disable-next-line
    }, [auth?.token]);

    return loading ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Spinner />
        </div>
    ) : ok ? (
        <>
            <Outlet />
        </>
    ) : (
        <Redirect path="" />
    );
};

export default PrivateRoute;
