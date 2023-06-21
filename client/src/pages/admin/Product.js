import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

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
        <div className="flex justify-center w-full p-10 mx-4 ">
            <div className="w-full flex flex-col gap-10 items-center">
                <div className="relative w-full flex items-center justify-center">
                    <div className="text-4xl text-primary">Products</div>
                    <Link
                        to="create-product"
                        className="btn-solid-primary absolute top-0 bottom-0 right-0 z-auto"
                    >
                        Add a Product
                    </Link>
                </div>
                {loading ? (
                    <Spinner />
                ) : products.length === 0 ? (
                    <div>No product added</div>
                ) : (
                    <div className="flex gap-4 px-10 flex-wrap">
                        {/* Products */}
                        {products?.map((product) => {
                            return (
                                <div key={product._id}>
                                    <Link
                                        to={`${product.slug}`}
                                        className="border-gray-300 border-2 flex flex-col"
                                    >
                                        <div className="w-64 h-64 border-b-2 border-gray-300 object-contain p-4">
                                            <img
                                                src={`product/product-photo/${product._id}`}
                                                alt={product.name}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <div>{product.name}</div>
                                            <div className="text-sm">
                                                {product.description}
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
