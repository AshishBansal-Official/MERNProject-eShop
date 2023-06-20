import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState(0);
    const [photo, setPhoto] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name.trim());
            productData.append("description", description.trim());
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("shipping", shipping);
            productData.append("category", category ?? categories[0]._id);
            const { data } = await api.post(
                "/product/create-product",
                productData
            );
            if (data?.success) {
                toast.success(`Product is created successfully`);
                setName("");
                setDescription("");
                setPrice("");
                setQuantity("");
                setPhoto("");
                setShipping("");
                setCategory("");
                navigate("/dashboard/admin/product", { replace: true });
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in creating product");
        }
    };

    return (
        <div className="flex justify-center w-full p-10 mx-4 ">
            <div className="max-w-[40rem] w-full flex flex-col gap-10">
                <div className="text-4xl text-primary">Create Product</div>
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
                        onSubmit={handleAddProduct}
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
                            type="text"
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
                                value={shipping}
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
                                {categories?.map((category) => {
                                    return (
                                        <option
                                            value={category._id}
                                            key={category._id}
                                        >
                                            {category.name}
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
                        {photo && (
                            <div>
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt="product_photo"
                                    className="h-40"
                                />
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Submit"
                            className="btn-solid-primary mt-2"
                        ></input>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateProduct;
