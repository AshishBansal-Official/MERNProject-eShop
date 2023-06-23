import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { baseURL } from "../../utils/api";

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState();
    const [photo, setPhoto] = useState("");
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    // Get Single Product
    const getSingleProduct = async () => {
        try {
            const {
                data: { product },
            } = await api.get(`product/get-product/${params.slug}`);
            setName(product.name);
            setId(product._id);
            setDescription(product.description);
            setPrice(product.price);
            setQuantity(product.quantity);
            setShipping(product.shipping);
            setCategory(product.category._id);
        } catch (error) {
            console.log(error);
            toast.error("Error fetching product details");
        }
    };

    useEffect(() => {
        getSingleProduct();
        // eslint-disable-next-line
    }, []);

    // Get all categories
    const getAllCategories = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/category/get-categories");
            if (data?.success) {
                setCategories(data?.category);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting categories");
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name.trim());
            productData.append("description", description.trim());
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("shipping", shipping);
            productData.append("category", category);
            const { data } = await api.put(
                `/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.success(`Product is updated successfully`);
                navigate("/dashboard/admin/product", { replace: true });
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while updating product");
        }
    };

    const handleDeleteProduct = async (e) => {
        e.preventDefault();
        try {
            let answer = window.confirm(
                "Are you sure you want to delete this product?"
            );
            if (!answer) return;
            const { data } = await api.delete(`/product/delete-product/${id}`);
            if (data?.success) {
                toast.success(`Product is deleted successfully`);
                navigate("/dashboard/admin/product", { replace: true });
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while deleting product");
        }
    };

    return (
        <div className="flex justify-center w-full p-10 mx-4 app-md:mx-0 app-md:p-6">
            <div className="max-w-[40rem] w-full flex flex-col gap-10 app-md:gap-6">
                <div className="text-4xl text-primary">Update Product</div>
                {loading ? (
                    <Spinner />
                ) : categories?.length === 0 ? (
                    <div className="flex flex-col items-start">
                        <div className="mb-2">No category found</div>
                        <Link
                            to="/dashboard/admin/create-category"
                            className="btn-solid-primary"
                        >
                            Add Category
                        </Link>
                    </div>
                ) : (
                    <form
                        onSubmit={handleUpdateProduct}
                        className="flex flex-col items-start gap-4"
                    >
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Enter Name"
                            className="form-input-field"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <textarea
                            name="description"
                            value={description}
                            placeholder="Enter Description"
                            className="form-input-field"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            name="number"
                            value={price}
                            placeholder="Enter Price"
                            className="form-input-field"
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={quantity}
                            placeholder="Enter Quantity"
                            className="form-input-field"
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                        <div className="flex items-center">
                            <div className="mr-4 text-primary">Shipping</div>

                            <select
                                required
                                name="shipping"
                                placeholder="Select Shipping"
                                className="p-2 outline-none"
                                value={shipping ? 1 : 0}
                                onChange={(e) => setShipping(e.target.value)}
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-4 text-primary">Category</div>
                            <select
                                required
                                className="p-2 outline-none"
                                name="category"
                                value={category}
                                placeholder="Select Category"
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                            >
                                {categories?.map((currentCategory) => {
                                    return (
                                        <option
                                            value={currentCategory._id}
                                            key={currentCategory._id}
                                        >
                                            {currentCategory.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="btn-solid-primary">
                                {photo ? photo.name : "Upload Photo"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setPhoto(e.target.files[0])
                                    }
                                    hidden
                                />
                            </label>
                        </div>
                        {photo ? (
                            <div>
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt="product_photo"
                                    className="h-40"
                                    loading="lazy"
                                />
                            </div>
                        ) : (
                            <div>
                                {id && (
                                    <img
                                        src={`${baseURL}product/product-photo/${id}`}
                                        alt="product_photo"
                                        className="h-40"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                        )}
                        <div className="flex mt-2 gap-2">
                            <input
                                type="submit"
                                value="Update"
                                className="btn-solid-primary bg-blue-500"
                            ></input>
                            <input
                                type="button"
                                value="Delete"
                                className="btn-solid-primary bg-red-500"
                                onClick={handleDeleteProduct}
                            ></input>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateProduct;
