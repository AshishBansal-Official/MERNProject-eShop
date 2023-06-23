import { useSearch } from "../context/search";
import ProductsComponent from "../components/ProductsComponent";

const Search = () => {
    const [searchValue] = useSearch();

    return (
        <div className="flex justify-center w-full p-10 mx-4 app-md:mx-0 app-md:p-6 app-md:px-0">
            <div className="w-full flex flex-col gap-10 items-center app-md:gap-6">
                <div className="relative w-full flex justify-center items-center">
                    <div className="text-4xl text-primary">Search Results</div>
                </div>
                {searchValue?.results.length === 0 ? (
                    <div>No product found</div>
                ) : (
                    <ProductsComponent products={searchValue?.results} />
                )}
            </div>
        </div>
    );
};

export default Search;
