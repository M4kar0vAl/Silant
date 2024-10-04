import { createContext, useContext, useReducer } from "react";

const tableDataContext = createContext(null)
const tableDataDispatchContext = createContext(null)

export function useTableData() {
    return useContext(tableDataContext)
}

export function useTableDataDispatch() {
    return useContext(tableDataDispatchContext)
}

export function TableDataProvider({ children }) {
    const [tableData, dispatch] = useReducer(tableDataReducer, JSON.parse(localStorage.getItem('tableData')))
    // tableData = {initialData: [], filters: {}, tab: '', sorting: {field: '', type: ''}}
    return (
        <tableDataContext.Provider value={tableData}>
            <tableDataDispatchContext.Provider value={dispatch}>
                {children}
            </tableDataDispatchContext.Provider>
        </tableDataContext.Provider>
    )
}

function tableDataReducer(state, action) {
    const { type, initialData, filters, tab, sorting } = action

    let nextState
    switch (type) {
        case 'setInitialData':
            nextState = {
                ...state,
                initialData: initialData
            }
            localStorage.setItem('tableData', JSON.stringify(nextState))
            return nextState
        case 'setFilters':
            nextState = {
                ...state,
                filters: filters
            }
            localStorage.setItem('tableData', JSON.stringify(nextState))
            return nextState
        case 'setTab':
            nextState = {
                ...state,
                tab: tab
            }
            localStorage.setItem('tableData', JSON.stringify(nextState))
            return nextState
        case 'setSorting':
            nextState = {
                ...state,
                sorting: sorting
            }
            localStorage.setItem('tableData', JSON.stringify(nextState))
            return nextState
        case 'clearTableData':
            localStorage.removeItem('tableData')
            return null
    }

    throw Error(`Unknown action type: ${type}`);
}
