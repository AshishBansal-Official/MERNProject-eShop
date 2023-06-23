import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import ProductsComponent from "../components/ProductsComponent";

const CategoryProduct = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
        // eslint-disable-next-line
    }, [params?.slug]);

    const getPrductsByCat = async () => {
        try {
            const { data } = await api.get(
                `product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center w-full p-10 mx-4 app-md:mx-0 app-md:p-6 app-md:px-0">
            <div className="w-full flex flex-col gap-10 items-center app-md:gap-6">
                <div className="relative w-full flex flex-col items-center justify-center">
                    <div className="text-4xl text-primary">
                        Category - {category?.name}
                    </div>
                    <div className="text-lg pt-2">
                        {products?.length} result found{" "}
                    </div>
                </div>
                {products.length === 0 ? (
                    <div>No Product Found</div>
                ) : (
                    <ProductsComponent products={products} />
                )}
            </div>
        </div>
    );
};

export default CategoryProduct;
