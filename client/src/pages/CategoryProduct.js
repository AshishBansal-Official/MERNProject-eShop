import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { baseURL } from "../utils/api";

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
        // eslint-disable-next-line
    }, [params?.slug]);

    const getPrductsByCat = async () => {
        try {
            const { data } = await api.get(
                `product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center w-full p-10 mx-4 app-md:mx-0 app-md:p-6">
            <div className="w-full flex flex-col gap-10 items-center app-md:gap-6">
                <div className="relative w-full flex flex-col items-center justify-center">
                    <div className="text-4xl text-primary">
                        Category - {category?.name}
                    </div>
                    <div className="text-lg pt-2">
                        {products?.length} result found{" "}
                    </div>
                </div>
                {products.length === 0 ? (
                    <div>No Product Found</div>
                ) : (
                    <div className="flex gap-4 flex-wrap flex-1 app-md:gap-2 justify-center">
                        {/* Products */}
                        {products?.map((product) => {
                            return (
                                <div key={product._id}>
                                    <div className="border-gray-300 border-2 flex flex-col w-64 app-md:w-52">
                                        <div className="w-64 h-64 border-b-2 border-gray-300 app-md:w-full app-md:h-52">
                                            <img
                                                src={`${baseURL}product/product-photo/${product._id}`}
                                                alt={product.name}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="font-semibold text-primary">
                                                {product.name}
                                            </div>
                                            <div className="text-sm">
                                                {product.description.substring(
                                                    0,
                                                    30
                                                )}
                                            </div>
                                            <div className="text-sm font-semibold">
                                                {product.price.toLocaleString(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency: "INR",
                                                    }
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex app-md:gap-2 mb-4 items-center justify-center">
                                            <div
                                                className="btn-solid-primary bg-blue-500 text-sm mr-2 app-md:mr-0"
                                                onClick={() =>
                                                    navigate(
                                                        `/product/${product.slug}`
                                                    )
                                                }
                                            >
                                                DETAILS
                                            </div>
                                            <div
                                                className="btn-solid-primary text-sm"
                                                onClick={() => {
                                                    setCart([...cart, product]);
                                                    localStorage.setItem(
                                                        "cart",
                                                        JSON.stringify([
                                                            ...cart,
                                                            product,
                                                        ])
                                                    );
                                                    toast.success(
                                                        "Product Added to Cart"
                                                    );
                                                }}
                                            >
                                                ADD TO CART
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryProduct;
