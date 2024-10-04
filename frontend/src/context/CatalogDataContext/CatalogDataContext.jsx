import { createContext, useContext, useReducer } from "react";

const CatalogDataContext = createContext(null)
const CatalogDataDispatchContext = createContext(null)

export function useCatalogData() {
    return useContext(CatalogDataContext)
}

export function useCatalogDataDispatch() {
    return useContext(CatalogDataDispatchContext)
}

export function CatalogDataProvider({ children }) {
    const [catalogData, dispatch] = useReducer(CatalogDataReducer, JSON.parse(localStorage.getItem('catalogData')))
    // catalogData = {initialData, filters, sorting: {field: '', type: ''}}
    return (
        <CatalogDataContext.Provider value={catalogData}>
            <CatalogDataDispatchContext.Provider value={dispatch}>
                {children}
            </CatalogDataDispatchContext.Provider>
        </CatalogDataContext.Provider>
    )
}

function CatalogDataReducer(state, action) {
    const {type, initialData, filters, sorting} = action

    let nextState
    switch (type) {
        case 'setInitialData':
            nextState = {
                ...state,
                initialData: initialData
            }
            localStorage.setItem('catalogData', JSON.stringify(nextState))
            return nextState
        case 'setFilters':
            nextState = {
                ...state,
                filters: filters
            }
            localStorage.setItem('catalogData', JSON.stringify(nextState))
            return nextState
        case 'setSorting':
            nextState = {
                ...state,
                sorting: sorting
            }
            localStorage.setItem('catalogData', JSON.stringify(nextState))
            return nextState
        case 'clearCatalogData':
            localStorage.removeItem('catalogData')
            return null
    }
    throw new Error(`Unknown action type: ${type}`);
}