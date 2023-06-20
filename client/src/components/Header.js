import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { HiShoppingBag } from "react-icons/hi2";
import { useAuth } from "../context/auth";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import api from "../utils/api";
import useCategory from "../hooks/useCategory";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [searchValue, setSearchValue] = useSearch();
    const navigate = useNavigate();
    const categories = useCategory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.get(
                `product/search/${searchValue.keyword}`
            );
            setSearchValue({ keyword: "", results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    return (
        <div className="h-16 flex items-center justify-between mx-4 gap-4 p-2 z-50">
            {/* Logo */}
            <Link
                to="/"
                className="font-semibold font-poppins text-xl text-primary flex-grow-0 cursor-pointer select-none"
            >
                <div className="flex items-center">
                    <HiShoppingBag className="h-8 w-8 mr-0.5" />
                    EShop
                </div>
            </Link>
            {/* Search Bar */}
            <>
                <form
                    className="flex-grow flex justify-center"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        className="flex h-10 rounded-l-full border-primary border-2 w-full max-w-md outline-none px-4"
                        placeholder="What are you looking for?"
                        value={searchValue.keyword}
                        onChange={(e) =>
                            setSearchValue({
                                ...searchValue,
                                keyword: e.target.value,
                            })
                        }
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="bg-primary h-10 w-20 rounded-r-full text-white flex items-center justify-center px-2 cursor-pointer select-none"
                    />
                </form>
            </>
            {/* End */}
            <div className="flex items-center gap-2">
                {/* Category */}
                {
                    <div
                        className="relative ml-2"
                        onMouseEnter={() => {
                            setShowCategoryDropdown(true);
                        }}
                        onMouseLeave={() => {
                            setShowCategoryDropdown(false);
                        }}
                    >
                        <div
                            onClick={() => {
                                setShowCategoryDropdown((show) => !show);
                            }}
                            className="text-primary flex items-center justify-center font-semibold cursor-pointer"
                        >
                            CATEGORY
                        </div>
                        <div
                            onClick={() => setShowCategoryDropdown(false)}
                            className={`absolute top-full right-0 ${
                                !showCategoryDropdown && "hidden"
                            }`}
                        >
                            <div>
                                <Link
                                    to={`/categories`}
                                    className="btn-solid-primary rounded-none whitespace-nowrap"
                                >
                                    All Categories
                                </Link>
                                <div className="h-[1px] bg-white"></div>
                            </div>

                            {categories?.map((category) => {
                                return (
                                    <div key={category._id}>
                                        <Link
                                            to={`/category/${category.slug}`}
                                            className="btn-solid-primary rounded-none whitespace-nowrap"
                                        >
                                            {category.name}
                                        </Link>
                                        <div className="h-[1px] bg-white"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                }
                {/* Cart */}
                <Link
                    to="/cart"
                    className="h-10 w-10 text-primary relative cursor-pointer"
                >
                    <AiOutlineShoppingCart className="h-full w-full" />
                    {cart?.length > 0 && (
                        <div className="absolute top-0 right-0 rounded-full select-none bg-primary h-5 w-5 text-white flex justify-center items-center text-xs">
                            {cart?.length}
                        </div>
                    )}
                </Link>
                {/* Login-Register / Dashboard-Logout */}
                {!auth.user ? (
                    <>
                        <Link to="/login" className="btn-solid-primary">
                            Login
                        </Link>
                        <Link to="/register" className="btn-solid-primary">
                            Register
                        </Link>
                    </>
                ) : (
                    <div
                        className="relative ml-2"
                        onMouseEnter={() => {
                            setShowDropdown(true);
                        }}
                        onMouseLeave={() => {
                            setShowDropdown(false);
                        }}
                    >
                        <div
                            onClick={() => {
                                setShowDropdown((show) => !show);
                            }}
                            className="h-10 w-10 rounded-full border-primary border-2 text-primary flex items-center justify-center"
                        >
                            <div className="h-8 w-8 cursor-pointer">
                                <AiOutlineUser className="h-full w-full" />
                            </div>
                        </div>
                        <div
                            onClick={() => setShowDropdown(false)}
                            className={`absolute top-full right-0 ${
                                !showDropdown && "hidden"
                            }`}
                        >
                            <Link
                                to={`/dashboard/${
                                    auth?.user?.role === 1 ? "admin" : "user"
                                }`}
                                className="btn-solid-primary rounded-none"
                            >
                                Dashboard
                            </Link>
                            <div className="h-[1px] bg-white"></div>
                            <Link
                                to="/login"
                                onClick={handleLogout}
                                className="btn-solid-primary rounded-none"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
