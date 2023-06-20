import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/auth";

// Layouts
import RootLayout from "./layout/RootLayout";

// Pages
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PageNotFound from "./pages/PageNotFound";

import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";

import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Category from "./pages/admin/Category";
import Product from "./pages/admin/Product";
// import Users from "./pages/admin/Users";
import CreateProduct from "./pages/admin/CreateProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import { SearchProvider } from "./context/search";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import { CartProvider } from "./context/cart";
import CartPage from "./pages/CartPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

const appRouter = createBrowserRouter([
    {
        path: "",
        element: (
            <SearchProvider>
                <AuthProvider>
                    <CartProvider>
                        <RootLayout />
                    </CartProvider>
                </AuthProvider>
            </SearchProvider>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "category/:slug",
                element: <CategoryProduct />,
            },
            {
                path: "product/:slug",
                element: <ProductDetails />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "dashboard/user",
                element: <PrivateRoute />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />,
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "orders",
                        element: <Orders />,
                    },
                ],
            },
            {
                path: "dashboard/admin",
                element: <AdminRoute />,
                children: [
                    {
                        path: "",
                        element: <AdminDashboard />,
                    },
                    {
                        path: "create-category",
                        element: <Category />,
                    },
                    {
                        path: "product",
                        element: <Outlet />,
                        children: [
                            {
                                path: "",
                                element: <Product />,
                            },
                            {
                                path: "create-product",
                                element: <CreateProduct />,
                            },
                            {
                                path: ":slug",
                                element: <UpdateProduct />,
                            },
                        ],
                    },
                    // {
                    //     path: "users",
                    //     element: <Users />,
                    // },
                ],
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
]);

root.render(<RouterProvider router={appRouter} />);
