import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { baseURL } from "../utils/api";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();

    // Initial Details
    useEffect(() => {
        if (params?.slug) getProduct();
        // eslint-disable-next-line
    }, [params?.slug]);

    // Get Similar Products
    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await api.get(
                `product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    // Get Product
    const getProduct = async () => {
        try {
            const { data } = await api.get(
                `product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProducts(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="p-8 flex gap-8">
                <div className="w-80 h-80 border-2 border-gray-300">
                    <img
                        src={`${baseURL}product/product-photo/${product._id}`}
                        alt={product.name}
                        className="h-full w-full object-contain"
                    />
                </div>
                <div>
                    <div className="text-4xl text-primary mb-2">
                        Product Details
                    </div>
                    <div className="text-lg font-medium">
                        Name :{" "}
                        <span className="text-lg font-normal">
                            {product.name}
                        </span>
                    </div>
                    <div className="text-lg font-medium">
                        Description :{" "}
                        <span className="text-lg font-normal">
                            {product.description}
                        </span>
                    </div>
                    <div className="text-lg font-medium">
                        Price :{" "}
                        <span className="text-lg font-normal">
                            {product.price}
                        </span>
                    </div>
                    <div className="text-lg font-medium">
                        Category :{" "}
                        <span className="text-lg font-normal">
                            {product?.category?.name}
                        </span>
                    </div>
                    <div
                        className="btn-solid-primary max-w-min whitespace-nowrap mt-4"
                        onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, product])
                            );
                            toast.success("Product Added to Cart");
                        }}
                    >
                        ADD TO CART
                    </div>
                </div>
            </div>
            <hr className="border-2" />
            <div className="m-8">
                <div className="text-3xl text-primary mb-4">
                    Similar Products
                </div>
                {relatedProducts.length === 0 ? (
                    <div>
                        <div className="text-xl">No Similar Products Found</div>
                    </div>
                ) : (
                    <div className="flex gap-4 flex-wrap flex-1 justify-center">
                        {/* Products */}
                        {relatedProducts?.map((product) => {
                            return (
                                <div key={product._id}>
                                    <div className="w-64 border-gray-300 border-2 flex flex-col app-md:w-52">
                                        <div className="w-64 h-64 border-b-2 border-gray-300 app-md:w-full app-md:h-52">
                                            <img
                                                src={`${baseURL}product/product-photo/${product._id}`}
                                                alt={product.name}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div className="font-semibold text-primary">
                                                {product.name.substring(0, 24)}
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

export default ProductDetails;
