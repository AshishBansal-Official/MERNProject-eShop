import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Prices } from "../utils/filterUtils";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { baseURL } from "../utils/api";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [firstLoading, setFirstLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    // Get all products
    const getAllProducts = async () => {
        setFirstLoading(true);
        try {
            const { data } = await api.get(`/product/product-list/${page}`);
            if (data?.success) {
                setProducts(data?.products);
            }
            setFirstLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting products");
            setFirstLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts();
        // eslint-disable-next-line
    }, []);

    // Get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await api.get("/category/get-categories");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting categories");
        }
    };

    // Get Total Count
    const getTotal = async () => {
        try {
            const { data } = await api.get("product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
        getTotal();
    }, []);

    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
        // eslint-disable-next-line
    }, [page]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await api.post("product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length && !radio.length) getAllProducts();
        //eslint-disable-next-line
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
        // eslint-disable-next-line
    }, [checked, radio]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            {/* Filters */}
            <div className="w-56 h-full flex flex-col">
                <div className="p-4 text-2xl text-primary">Filters</div>
                <hr />
                <hr />
                {/* Filter By Category */}
                <div className="mb-2">
                    <div className="px-4 pt-4 text-lg">Filter By Category</div>
                    <div className="px-4 py-2 max-h-48 flex flex-col ">
                        {categories.length > 0 &&
                            categories.map((category) => {
                                return (
                                    <div key={category._id}>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                onChange={(e) =>
                                                    handleFilter(
                                                        e.target.checked,
                                                        category._id
                                                    )
                                                }
                                            />
                                            <div className="-mt-0.5 ml-1">
                                                {category.name}
                                            </div>
                                        </label>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <hr />
                {/* Filter By Price */}
                <div className="mb-2">
                    <div className="px-4 pt-4 text-lg">Filter By Price</div>
                    <div className="px-4 py-2 max-h-48 flex flex-col ">
                        {Prices?.map((price) => {
                            return (
                                <div key={price._id}>
                                    <label className="flex">
                                        <input
                                            type="radio"
                                            name="price-filter"
                                            value={price.array}
                                            onChange={(e) =>
                                                setRadio(e.target.value)
                                            }
                                        />
                                        <div className="-mt-0.5 ml-1">
                                            {price.name}
                                        </div>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <hr />
                {/* Reset Button */}
                <div
                    className="btn-solid-primary mx-4"
                    onClick={() => window.location.reload()}
                >
                    Reset Filters
                </div>
            </div>
            {/* Products */}
            <div className="flex-1 flex flex-col h-full items-center p-8 gap-6">
                <div className="text-4xl m-x-auto text-primary">
                    All Products
                </div>
                {firstLoading ? (
                    <Spinner />
                ) : products.length === 0 ? (
                    <div>No product added</div>
                ) : (
                    <div className="flex gap-4 flex-wrap flex-1">
                        {/* Products */}
                        {products?.map((product) => {
                            return (
                                <div key={product._id}>
                                    <div className="border-gray-300 border-2 flex flex-col">
                                        <div className="w-64 h-64 border-b-2 border-gray-300">
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
                                        <div className="flex mb-4 items-center justify-center">
                                            <div
                                                className="btn-solid-primary bg-blue-500 text-sm mr-2"
                                                onClick={() =>
                                                    navigate(
                                                        `/product/${product.slug}`
                                                    )
                                                }
                                            >
                                                MORE DETAILS
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
                <div>
                    {products &&
                        products.length < total &&
                        products.length > 0 && (
                            <button
                                className="btn-solid-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Load More"}
                            </button>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Home;
