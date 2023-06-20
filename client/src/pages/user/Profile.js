import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { useAuth } from "../../context/auth";

const Profile = () => {
    // Context
    const [auth, setAuth] = useAuth();
    // State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.put("/auth/profile", {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.error) {
                toast.error(data.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Get User Data
    useEffect(() => {
        if (auth?.user) {
            const { email, name, phone, address } = auth?.user;
            setName(name);
            setPhone(phone);
            setEmail(email);
            setAddress(address);
        }
    }, [auth?.user]);

    return (
        <div className="flex items-center justify-center h-full">
            <form
                className="w-80 flex flex-col gap-4"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="text-4xl text-primary mb-2">User Profile</div>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input-field"
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input-field"
                    placeholder="Email"
                    disabled
                />
                <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input-field"
                    placeholder="Password"
                />
                <input
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input-field"
                    placeholder="Phone Number"
                />
                <textarea
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-input-field"
                    placeholder="Address"
                />
                <input
                    type="submit"
                    value="Update"
                    className="btn-solid-primary mt-2"
                ></input>
            </form>
        </div>
    );
};

export default Profile;
