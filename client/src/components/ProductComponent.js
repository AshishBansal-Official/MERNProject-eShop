import toast from "react-hot-toast";
import { baseURL } from "../utils/api";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

const ProductComponent = ({ product }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    return (
        <div key={product._id}>
            <div className="border-gray-300 border-2 flex flex-col w-64 app-md:w-52">
                <div className="w-64 h-64 border-b-2 border-gray-300 app-md:w-full app-md:h-52">
                    <img
                        src={`${baseURL}product/product-photo/${product._id}`}
                        alt={product.name}
                        className="h-full w-full object-contain"
                        loading="lazy"
                    />
                </div>
                <div className="p-2">
                    <div className="font-semibold text-primary">
                        {product.name.substring(0, 24)}
                    </div>
                    <div className="text-sm">
                        {product.description.substring(0, 30)}
                    </div>
                    <div className="text-sm font-semibold">
                        {product.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                        })}
                    </div>
                </div>
                <div className="flex app-md:gap-2 mb-4 items-center justify-center">
                    <div
                        className="btn-solid-primary bg-blue-500 text-sm mr-2 app-md:mr-0"
                        onClick={() => navigate(`/product/${product.slug}`)}
                    >
                        DETAILS
                    </div>
                    <div
                        className="btn-solid-primary text-sm"
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
};

export default ProductComponent;
