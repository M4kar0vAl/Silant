import { useTableData } from "../context";

export function useFilteredData() {
    const tableData = useTableData()
    let initialData, filters
    if (tableData) {
        const {initialData: initialData_, filters: filters_} = tableData
        initialData = initialData_
        filters = filters_
    }
    
    if (!initialData) return
    if (!filters) return initialData

    const filtersPairs = Object.entries(filters)
    if (filtersPairs.every(([, value]) => value === '')) {
        return initialData
    } else {
        let  filteredData = initialData
        for (let [key, value] of filtersPairs) {
            if (value !== '') {
                if (key === 'machine_serial_number') {
                    filteredData = filteredData.filter((maintenance) => maintenance.machine.serial_number.includes(value))
                } else {
                    filteredData = filteredData.filter((obj) => `${obj[key]?.id}` === value)
                }
            }
        }
        return filteredData
    }
}