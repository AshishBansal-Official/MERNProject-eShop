import { useState, useEffect } from "react";
import api from "../utils/api";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    // Get Categories
    const getCategories = async () => {
        try {
            const { data } = await api.get("category/get-categories");
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
}
