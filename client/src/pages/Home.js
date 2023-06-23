import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Prices } from "../utils/filterUtils";
import Spinner from "../components/Spinner";
import ProductComponent from "../components/ProductComponent";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);

    // Get all products
    const getAllProducts = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/product/get-products`);
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

    useEffect(() => {
        getAllCategories();
    }, []);

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
            <div className="w-56 h-full flex flex-col app-md:hidden">
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
            <div className="flex-1 flex flex-col h-full items-center p-8 gap-6 app-md:px-2">
                <div className="text-4xl m-x-auto text-primary">
                    All Products
                </div>
                {loading ? (
                    <Spinner />
                ) : products.length === 0 ? (
                    <div>No product added</div>
                ) : (
                    <div className="flex gap-4 flex-wrap flex-1">
                        {/* Products */}
                        {products?.map((product) => {
                            return <ProductComponent product={product} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
