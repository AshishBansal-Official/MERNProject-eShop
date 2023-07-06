import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import api from "../utils/api";
import useCategory from "../hooks/useCategory";

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
        <div className="flex flex-col">
            <div className="h-16 flex items-center justify-between bg-primary px-4 gap-4 p-2 z-50 app-md:mx-0 app-md:gap-1">
                {/* Logo */}
                <Link
                    to="/"
                    className="font-semibold font-poppins text-xl text-white flex-grow-0 cursor-pointer select-none"
                >
                    <div className="flex items-center">
                        <div className="h-8 w-8 mr-0.5 app-md:hidden">
                            {/* HiShoppingBag icon from react-icons */}
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-8 w-8 mr-0.5 app-md:hidden"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
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
                            className="flex h-10 rounded-l-full w-full max-w-md outline-none px-4"
                            placeholder="What are you looking for?"
                            value={searchValue.keyword}
                            onChange={(e) =>
                                setSearchValue({
                                    ...searchValue,
                                    keyword: e.target.value,
                                })
                            }
                        />
                        <button
                            type="submit"
                            className="bg-white text-primary border-2 border-white rounded-r-full  flex items-center justify-center px-2 cursor-pointer select-none"
                        >
                            {/* AiOutlineSearch from react icons */}
                            <div className="h-6 w-6">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 1024 1024"
                                    className="h-6 w-6"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                                </svg>
                            </div>
                        </button>
                    </form>
                </>
                {/* End */}
                <div className="flex items-center gap-2">
                    {/* Category */}
                    {
                        <div
                            className="relative ml-2 app-md:hidden"
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
                                className="text-white flex items-center justify-center font-semibold cursor-pointer"
                            >
                                CATEGORY
                            </div>
                            <div
                                onClick={() => setShowCategoryDropdown(false)}
                                className={`absolute border-2 border-white top-full right-0 ${
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
                        className="h-10 w-10 text-white relative cursor-pointer"
                    >
                        {/* AiOutlineShoppingCart from react-icons */}
                        <div className="h-full w-full">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 1024 1024"
                                className="h-full w-full"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
                            </svg>
                        </div>
                        {cart?.length > 0 && (
                            <div className="absolute top-0 right-0 rounded-full select-none bg-white h-5 w-5 text-primary flex justify-center items-center text-xs">
                                {cart?.length}
                            </div>
                        )}
                    </Link>
                    {/* Login-Register / Dashboard-Logout */}
                    {!auth.user ? (
                        <>
                            <Link
                                to="/login"
                                className="w-16 py-2 flex justify-center items-center text-white select-none cursor-pointer"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="w-16 py-2 flex justify-center items-center text-white select-none cursor-pointer"
                            >
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
                                className="h-10 w-10 rounded-full border-white border-2 text-white flex items-center justify-center"
                            >
                                <div className="h-8 w-8 cursor-pointer">
                                    {/* AiOutlineUser from react-icons */}
                                    <div className="h-full w-full">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 1024 1024"
                                            className="h-full w-full"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={() => setShowDropdown(false)}
                                className={`absolute top-[110%] border-2 border-white right-0 ${
                                    !showDropdown && "hidden"
                                }`}
                            >
                                <Link
                                    to={`/dashboard/${
                                        auth?.user?.role === 1
                                            ? "admin"
                                            : "user"
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
            <div className="hidden bg-slate-100 app-md:block m-2">
                <div
                    onClick={() => setShowCategoryDropdown(false)}
                    className={
                        "flex w-full  whitespace-nowrap overflow-x-scroll gap-2 scrollbar-none"
                    }
                >
                    <Link
                        to={`/categories`}
                        className="rounded-md bg-primary p-2 text-white"
                    >
                        All Categories
                    </Link>

                    {categories?.map((category) => {
                        return (
                            <Link
                                to={`/category/${category.slug}`}
                                key={category._id}
                                className="rounded-md bg-primary p-2 text-white"
                            >
                                {category.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Header;
