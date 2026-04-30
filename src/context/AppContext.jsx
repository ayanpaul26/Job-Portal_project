import { createContext, useState } from "react";

 export const AppContext = createContext()
 export const AppContextProvider = (props) =>{
    const[searchFilter,setSearchFilter] = useState({
        title:'',
        location:''
    })
        const[isSearched,setIsSearchFilter] = useState(false)
    const value = {
        searchFilter,setSearchFilter,
        isSearched,setIsSearchFilter,
    }

    return (<AppContext.Provider value = {value}>
        {props.children}
    </AppContext.Provider>)
 }