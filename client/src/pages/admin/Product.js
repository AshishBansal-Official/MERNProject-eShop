import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { baseURL } from "../../utils/api";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get all products
    const getAllProducts = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/product/get-products");
            if (data?.success) {
                setProducts(data?.products);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting products");
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="flex justify-center w-full p-10 mx-4 app-md:mx-0 app-md:p-6 app-md:px-0">
            <div className="w-full flex flex-col gap-10 items-center app-md:gap-6">
                <div className="relative w-full flex items-center justify-center app-md:flex-col">
                    <div className="text-4xl text-primary">Products</div>
                    <Link
                        to="create-product"
                        className="btn-solid-primary absolute top-0 bottom-0 right-0 z-auto app-md:relative app-md:mt-4"
                    >
                        Add a Product
                    </Link>
                </div>
                {loading ? (
                    <Spinner />
                ) : products.length === 0 ? (
                    <div>No product added</div>
                ) : (
                    <div className="flex gap-4 flex-wrap flex-1 app-md:justify-center app-md:gap-2 ">
                        {/* Products */}
                        {products?.map((product) => {
                            return (
                                <div key={product._id}>
                                    <Link
                                        to={`${product.slug}`}
                                        className="w-64 border-2 flex flex-col app-md:w-48"
                                    >
                                        <div className="w-full h-64 app-md:w-full app-md:h-48">
                                            <img
                                                src={`${baseURL}product/product-photo/${product._id}`}
                                                alt={product.name}
                                                className="h-full w-full object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-2 h-24 overflow-hidden">
                                            <div className="font-semibold text-primary">
                                                {product.name.length > 22
                                                    ? product.name.substring(
                                                          0,
                                                          22
                                                      ) + "..."
                                                    : product.name}
                                            </div>
                                            <div className="text-sm">
                                                {product.description.length > 75
                                                    ? product.description.substring(
                                                          0,
                                                          75
                                                      ) + "..."
                                                    : product.description}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
