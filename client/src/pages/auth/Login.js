import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });
            if (res && res?.data?.success) {
                toast.success(res?.data?.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
                setEmail("");
                setPassword("");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.log(error.message);
            error?.response?.data?.message &&
                toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <form
                className="w-80 flex flex-col gap-4"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="text-4xl text-primary mb-2">Login</div>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input-field"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input-field"
                    placeholder="Password"
                    required
                />
                <input
                    type="submit"
                    value="Login"
                    className="btn-solid-primary mt-2"
                ></input>
            </form>
        </div>
    );
};

export default Login;
