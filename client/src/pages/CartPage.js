import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

const CartPage = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // Total Price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Detele Item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    // Place Order
    const placeOrder = async () => {
        try {
            await api.post("/product/payment", { cart });
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <div className="flex justify-center w-full p-10 mx-4">
                <div className="w-full flex flex-col gap-10 items-center">
                    <div className="relative w-full flex flex-col items-center justify-center">
                        <div className="text-4xl text-primary">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </div>
                        <h4 className="text-center">
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${
                                      auth?.token
                                          ? ""
                                          : "please login to checkout"
                                  }`
                                : " Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="flex-grow mb-4">
                    {cart.length === 0 && (
                        <div className="m-2 text-lg">No Item in Cart</div>
                    )}
                    {cart?.map((product, index) => (
                        <div
                            key={`${product._id}-${index}`}
                            className="flex gap-2 border-2 border-gray-300 mb-2 mx-2"
                        >
                            <div className="h-40 w-40 border-r-2 border-gray-300 p-2">
                                <img
                                    src={`${process.env.REACT_APP_API}product/product-photo/${product._id}`}
                                    alt={product.name}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <div className="flex flex-col gap-1 p-2">
                                <div>{product.name}</div>
                                <div>
                                    {product.description.substring(0, 100)}
                                </div>
                                <div>
                                    Price :{" "}
                                    {product.price.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "INR",
                                    })}
                                </div>
                                <div
                                    className="btn-solid-primary bg-red-500 w-min"
                                    onClick={() => removeCartItem(product._id)}
                                >
                                    Remove
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-1/3 max-w-sm ">
                    <div className="text-2xl">Cart Summary</div>
                    <div className="py-2">Total | Checkout | Payment</div>
                    <hr />
                    <div className="py-4">
                        <div className="text-xl">Total : {totalPrice()} </div>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <div className="my-4">
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                    </div>
                                    <div
                                        className="btn-solid-primary w-min whitespace-nowrap bg-blue-500"
                                        onClick={() =>
                                            navigate("/dashboard/user/profile")
                                        }
                                    >
                                        Update Address
                                    </div>
                                </div>
                                <div
                                    className="btn-solid-primary w-min whitespace-nowrap"
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <div
                                        className="btn-solid-primary w-min whitespace-nowrap mt-4 bg-blue-500"
                                        onClick={() =>
                                            navigate("/dashboard/user/profile")
                                        }
                                    >
                                        Update Address
                                    </div>
                                ) : (
                                    <div
                                        className="btn-solid-primary w-min whitespace-nowrap mt-4"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Plase Login to checkout
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
