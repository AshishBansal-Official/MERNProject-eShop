import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";

const CategoryTile = ({ category, refreshCategories }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(category.name);

    // Update Category
    const handleUpdate = async () => {
        try {
            const { data } = await api.put(
                `/category/update-category/${category._id}`,
                {
                    name,
                }
            );
            if (data.success) {
                toast.success(`${name} is updated`);
                refreshCategories();
            } else {
                toast.error(data.message);
            }
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating category");
            setIsEditing(false);
        }
    };

    // Delete Category
    const handleDelete = async () => {
        try {
            const { data } = await api.delete(
                `/category/delete-category/${category._id}`
            );
            if (data.success) {
                toast.success(`${name} is deleted`);
                refreshCategories();
            } else {
                toast.error(data.message);
            }
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while deleting category");
            setIsEditing(false);
        }
    };

    return (
        <div key={category._id}>
            <div className="grid grid-cols-2 my-2 items-center">
                <div>{category.name}</div>
                {isEditing ? (
                    <form
                        className="flex"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (category.name === name) {
                                toast.success("Category is updated");
                                setIsEditing(false);
                            } else {
                                handleUpdate();
                            }
                        }}
                    >
                        <input
                            type="text"
                            name="category"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input-field"
                            placeholder="Enter New Category"
                        />
                        <button
                            type="submit"
                            className="btn-solid-primary bg-blue-500 ml-2"
                        >
                            {/* ImCheckmark from react-icons */}
                            <div>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    version="1.1"
                                    viewBox="0 0 16 16"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"></path>
                                </svg>
                            </div>
                        </button>
                        <div
                            onClick={() => {
                                setIsEditing((isEdit) => !isEdit);
                                setName(category.name);
                            }}
                            className="btn-solid-primary bg-red-500 ml-2"
                        >
                            {/* ImCross from react-icons */}
                            <div>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    version="1.1"
                                    viewBox="0 0 16 16"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path>
                                </svg>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="flex">
                        <div
                            onClick={() => setIsEditing((isEdit) => !isEdit)}
                            className="btn-solid-primary bg-blue-500 mr-4"
                        >
                            Edit
                        </div>
                        <div
                            onClick={handleDelete}
                            className="btn-solid-primary bg-red-500"
                        >
                            Delete
                        </div>
                    </div>
                )}
            </div>
            <div className="h-0.5 w-full bg-gray-300"></div>
        </div>
    );
};

export default CategoryTile;
