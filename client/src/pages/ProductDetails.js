import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { baseURL } from "../utils/api";
import ProductsComponent from "../components/ProductsComponent";

const ProductDetails = () => {
    const params = useParams();
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
            <div className="p-8 flex gap-8 app-md:gap-3 app-md:px-3">
                <div className="w-80 h-80 border-2">
                    <img
                        src={`${baseURL}product/product-photo/${product._id}`}
                        alt={product.name}
                        className="h-full w-full object-contain"
                        loading="lazy"
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
                <div className="text-3xl text-primary mb-4 app-md:text-center">
                    Similar Products
                </div>
                {relatedProducts.length === 0 ? (
                    <div>
                        <div className="text-xl">No Similar Products Found</div>
                    </div>
                ) : (
                    <ProductsComponent
                        products={relatedProducts}
                        className="justify-start"
                    />
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
