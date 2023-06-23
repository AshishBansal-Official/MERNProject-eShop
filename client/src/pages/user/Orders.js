import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import moment from "moment";
import api, { baseURL } from "../../utils/api";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await api.get("auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <div>
            <div className="flex justify-center w-full p-8 mx-4 app-md:mx-0 app-md:p-6">
                <div className="w-full flex flex-col gap-8 items-center app-md:gap-6">
                    <div className="relative w-full flex items-center justify-center">
                        <div className="text-4xl text-primary">All Orders</div>
                    </div>
                    {/* List of Orders */}
                    <div className="w-full">
                        {orders?.length === 0 ? (
                            <div>No Orders Placed</div>
                        ) : (
                            <div>
                                <div className="flex flex-col">
                                    <div className="flex text-center border-2">
                                        <div className="font-semibold w-1/12 py-2">
                                            #
                                        </div>
                                        <div className="font-semibold w-3/12 py-2">
                                            Status
                                        </div>
                                        <div className="font-semibold w-3/12 py-2">
                                            Buyer
                                        </div>
                                        <div className="font-semibold w-3/12 py-2">
                                            Date
                                        </div>
                                        <div className="font-semibold w-2/12 py-2">
                                            Qty
                                        </div>
                                    </div>
                                    {orders?.map((order, i) => {
                                        return (
                                            <div
                                                key={`${order._id}-${i}`}
                                                className="flex flex-col text-center border-x-2 border-b-2"
                                            >
                                                <div className="flex border-b-2 mb-2">
                                                    <div className="w-1/12 py-2">
                                                        {i + 1}
                                                    </div>
                                                    <div className="w-3/12 py-2">
                                                        {order?.status}
                                                    </div>
                                                    <div className="w-3/12 py-2">
                                                        {order?.buyer?.name}
                                                    </div>
                                                    <div className="w-3/12 py-2">
                                                        {moment(
                                                            order?.createAt
                                                        ).fromNow()}
                                                    </div>
                                                    <div className="w-2/12 py-2">
                                                        {
                                                            order?.products
                                                                ?.length
                                                        }
                                                    </div>
                                                </div>
                                                <div>
                                                    {order?.products?.map(
                                                        (product, index) => (
                                                            <div
                                                                key={`${product._id}-${index}`}
                                                                className="flex flex-col border-2 mb-2 mx-2 text-left"
                                                            >
                                                                <div className="flex items-center   ">
                                                                    <div className="h-40 w-40 min-w-[10rem]">
                                                                        <img
                                                                            src={`${baseURL}product/product-photo/${product._id}`}
                                                                            alt={
                                                                                product.name
                                                                            }
                                                                            className="h-full w-full object-contain"
                                                                            loading="lazy"
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col flex-grow gap-1 p-2">
                                                                        <div>
                                                                            {product
                                                                                .name
                                                                                .length >
                                                                            22
                                                                                ? product.name.substring(
                                                                                      0,
                                                                                      22
                                                                                  ) +
                                                                                  "..."
                                                                                : product.name}
                                                                        </div>
                                                                        <div className="app-md:text-sm max-h-11 overflow-hidden whitespace-nowrap app-md:whitespace-normal">
                                                                            {
                                                                                product.description
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            Price
                                                                            :{" "}
                                                                            {product.price.toLocaleString(
                                                                                "en-US",
                                                                                {
                                                                                    style: "currency",
                                                                                    currency:
                                                                                        "INR",
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
