import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register", {
                name,
                email,
                password,
                phone,
                address,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setName("");
                setEmail("");
                setPassword("");
                setPhone("");
                setAddress("");
                navigate("/login", { replace: true });
            } else {
                toast.error(res.data.message);
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
                <div className="text-4xl text-primary mb-2">Register</div>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input-field"
                    placeholder="Name"
                    required
                />
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
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input-field"
                    placeholder="Phone Number"
                    required
                />
                <textarea
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-input-field"
                    placeholder="Address"
                    required
                />
                <input
                    type="submit"
                    value="Register"
                    className="btn-solid-primary mt-2"
                ></input>
            </form>
        </div>
    );
};

export default Register;
