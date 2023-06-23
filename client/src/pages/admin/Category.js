import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import CategoryTile from "./CategoryTile";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

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

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (name.trim() === "") {
            toast.error("Please Enter Category");
            return;
        }
        setName(name.trim());
        try {
            const { data } = await api.post("/category/create-category", {
                name,
            });
            if (data?.success) {
                toast.success(`${data.category.name} is created`);
                getAllCategories();
                setName("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in creating category");
        }
    };

    return (
        <div className="flex justify-center w-full p-10 mx-4 app-md:mx-0 app-md:p-6">
            <div className="max-w-[40rem] w-full flex flex-col gap-10 app-md:gap-6">
                <div className="text-4xl text-primary">Manage Categories</div>
                <form onSubmit={handleAddCategory}>
                    <input
                        type="text"
                        name="category"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input-field w-96 mb-4"
                        placeholder="Enter New Category"
                        required
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="btn-solid-primary "
                    ></input>
                </form>
                {categories.length === 0 ? (
                    <div>No category added</div>
                ) : (
                    <div className="">
                        <div className="grid grid-cols-2 my-1">
                            <div className="font-bold text-lg">
                                Category Name
                            </div>
                            <div className="font-bold text-lg">Actions</div>
                        </div>
                        <div className="h-0.5 w-full bg-gray-300"></div>
                        {/* Categories */}
                        {categories?.map((category) => {
                            return (
                                <CategoryTile
                                    key={category._id}
                                    category={category}
                                    refreshCategories={getAllCategories}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;
