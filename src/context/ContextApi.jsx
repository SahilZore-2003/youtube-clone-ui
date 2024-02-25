import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDataFromApi } from "../utils/api";
import data from "../../content.json";




const ContextApi = createContext(null)

export const ContextApiProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [searchResult, setSearchResult] = useState(data.contents)
    const [selectCategory, setSelectCategory] = useState("New")
    const [mobileMenu, setMobileMenu] = useState(false)


    useEffect(() => {
        fetchSelectedCategoryData(selectCategory)
    }, [selectCategory]);

    const fetchSelectedCategoryData = (query) => {
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then((res) => {
            console.log(res);
            setLoading(false)
            setSearchResult(res.contents)
        })
    }


    return <ContextApi.Provider value={{
        loading,
        setLoading,
        searchResult,
        setSearchResult,
        selectCategory,
        setSelectCategory,
        mobileMenu,
        setMobileMenu
    }}>
        {children}
    </ContextApi.Provider>
}

const useContextApi = () => useContext(ContextApi);
export default useContextApi;