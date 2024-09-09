import React from 'react'

const SearchContext = React.createContext()


export default function SearchProvider({ children }) {
    const [search, setSearch] = React.useState('')

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = React.useContext(SearchContext)
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
}
