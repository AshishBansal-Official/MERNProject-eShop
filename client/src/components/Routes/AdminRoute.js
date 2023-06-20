import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import api from "../../utils/api";
import Redirect from "../Redirect";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner.js";

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            setLoading(true);
            try {
                const res = await api.get("auth/admin-auth");
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
                setLoading(false);
            } catch (error) {
                toast.error(error.message + ": " + error.response.statusText);
                setLoading(false);
            }
        };
        if (auth?.token) authCheck();
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

export default AdminRoute;
