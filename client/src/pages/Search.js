import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const Search = () => {
    const [searchValue] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    return (
        <div className="flex justify-center w-full p-10 mx-4 ">
            <div className="w-full flex flex-col gap-10 items-center">
                <div className="relative w-full flex justify-center items-center">
                    <div className="text-4xl text-primary">Search Results</div>
                </div>
                {searchValue?.results.length === 0 ? (
                    <div>No product found</div>
                ) : (
                    <div className="flex gap-4 px-10 flex-wrap">
                        {/* Products */}
                        {searchValue?.results?.map((product) => {
                            return (
                                <div key={product._id}>
                                    <div className="border-gray-300 border-2 flex flex-col">
                                        <div className="w-64 h-64 border-b-2 border-gray-300 object-contain p-4">
                                            <img
                                                src={`product/product-photo/${product._id}`}
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
            </div>
        </div>
    );
};

export default Search;
