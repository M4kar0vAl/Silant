import { useTableData } from "../context"

export function useFilters() {
    const tableData = useTableData()

    let filters
    if (tableData) {
        const {filters: filters_} = tableData
        filters = filters_
    }

    return filters
}