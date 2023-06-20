import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState({
        keyword: "",
        results: [],
    });

    return (
        <SearchContext.Provider value={[searchValue, setSearchValue]}>
            {children}
        </SearchContext.Provider>
    );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
