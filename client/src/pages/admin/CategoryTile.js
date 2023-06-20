import React, { useState } from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { ImCheckmark } from "react-icons/im";
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
                            <ImCheckmark />
                        </button>
                        <div
                            onClick={() => {
                                setIsEditing((isEdit) => !isEdit);
                                setName(category.name);
                            }}
                            className="btn-solid-primary bg-red-500 ml-2"
                        >
                            <ImCross />
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
            <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
    );
};

export default CategoryTile;
