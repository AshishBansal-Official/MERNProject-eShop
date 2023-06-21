import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";

const Categories = () => {
    const categories = useCategory();
    return (
        <div className="flex justify-center w-full p-10 mx-4 app-md:mx-0 app-md:p-6">
            <div className="w-full flex flex-col gap-10 items-center app-md:gap-6">
                <div className="relative w-full flex items-center justify-center">
                    <div className="text-4xl text-primary">All Categories</div>
                </div>
                {categories.length === 0 ? (
                    <div>No category found</div>
                ) : (
                    <div className="flex gap-4 flex-wrap items-center justify-center">
                        {categories?.map((category) => {
                            return (
                                <Link
                                    to={`/category/${category.slug}`}
                                    className="bg-primary px-8 py-8 flex justify-center items-center text-white rounded-md select-none cursor-pointer text-2xl"
                                    key={category._id}
                                >
                                    {category.name}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
