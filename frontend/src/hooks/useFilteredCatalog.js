import { useCatalogData } from "../context";

export function useFilteredCatalog() {
    const catalogData = useCatalogData()

    let initialData, filters
    if (catalogData) {
        const {initialData: initialData_, filters: filters_} = catalogData
        initialData = initialData_
        filters = filters_
    }

    if (!initialData) return
    if (!filters) return initialData

    const filtersPairs = Object.entries(filters)
    
    let filteredData = initialData
    if (filtersPairs.every(([, value]) => value === '')) {
        return initialData
    } else {
        for (let [key, value] of filtersPairs) {
            if (value !== '') {
                if (key === 'name') {
                    filteredData = filteredData.filter((catalogObj) => catalogObj.name.toLowerCase().includes(value.toLowerCase()))
                } else {
                    filteredData = filteredData.filter((catalogObj) => catalogObj[key] === value)
                }
            }
        }
    }
    
    return filteredData
}