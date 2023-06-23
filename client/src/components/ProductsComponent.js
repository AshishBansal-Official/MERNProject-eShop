import toast from "react-hot-toast";
import { baseURL } from "../utils/api";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

const ProductsComponent = ({ products, className = "" }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    return (
        <div
            className={`flex gap-4 flex-wrap flex-1 app-md:justify-center app-md:gap-2 ${
                className === "" ? "justify-center" : className
            }`}
        >
            {products?.map((product) => {
                return (
                    <div key={product._id}>
                        <div className="border-2 flex flex-col w-64 app-md:w-48">
                            <div className="w-full h-64 app-md:w-full app-md:h-48">
                                <img
                                    src={`${baseURL}product/product-photo/${product._id}`}
                                    alt={product.name}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-2">
                                <div className="font-semibold text-primary">
                                    {product.name.length > 22
                                        ? product.name.substring(0, 22) + "..."
                                        : product.name}
                                </div>
                                <div className="text-sm">
                                    {product.description.length > 30
                                        ? product.description.substring(0, 30) +
                                          "..."
                                        : product.description}
                                </div>
                                <div className="text-sm font-semibold">
                                    {product.price.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "INR",
                                    })}
                                </div>
                            </div>
                            <div className="flex app-md:gap-1.5 mb-4 items-center justify-center">
                                <div
                                    className="btn-solid-primary bg-blue-500 text-sm mr-2 app-md:mr-0"
                                    onClick={() =>
                                        navigate(`/product/${product.slug}`)
                                    }
                                >
                                    DETAILS
                                </div>
                                <div
                                    className="btn-solid-primary text-sm px-1"
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
                    </div>
                );
            })}
        </div>
    );
};

export default ProductsComponent;
