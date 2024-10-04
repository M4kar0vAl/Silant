import { ENTITY_CHOICES } from "../constants";
import { useCatalogData } from "../context";

export function useSortedCatalog(data) {
    const catalogData = useCatalogData()
    
    if (!data) return

    let field, type
    if (catalogData) {
        const {sorting} = catalogData
        field = sorting.field
        type = sorting.type
    }

    if (!type || !field) return data

    return [...data].sort((a, b) => {
        if (field === 'entity') {
            let a_value = ENTITY_CHOICES[a[field]]
            let b_value = ENTITY_CHOICES[b[field]]
            switch (type) {
                case 'asc':
                    return a_value.localeCompare(b_value)
                case 'desc':
                    return b_value.localeCompare(a_value)
                default:
                    return 0
            }
        } else {
            switch (type) {
                case 'asc':
                    return a[field].localeCompare(b[field])
                case 'desc':
                    return b[field].localeCompare(a[field])
                default:
                    return 0
            }
        }
    })
}