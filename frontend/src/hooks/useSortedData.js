import { useTableData } from "../context"

export function useSortedData(data) {
    const tableData = useTableData()
    
    if (!data) return

    let field, type
    if (tableData) {
        const {sorting} = tableData
        field = sorting.field
        type = sorting.type
    }

    if (!type || !field) return data

    return [...data].sort((a, b) => {
        if (field === 'contractDate') {
            let res
            switch (type) {
                case 'asc':
                    res = Date.parse(a.supply_contract_number_date.split(', ')[1]) - Date.parse(b.supply_contract_number_date.split(', ')[1])
                    return isNaN(res) ? 1 : res
                case 'desc':
                    res = Date.parse(b.supply_contract_number_date.split(', ')[1]) - Date.parse(a.supply_contract_number_date.split(', ')[1])
                    return isNaN(res) ? -1 : res
                default:
                    return 0
            }
        } else if (field.includes('serial_number') || field === 'consignee' || field === 'work_order_number') {
            // serial number and consignee values are strings
            switch (type) {
                case 'asc':
                    return a[field].localeCompare(b[field])
                case 'desc':
                    return b[field].localeCompare(a[field])
                default:
                    return 0
            }
        } else if (field.includes('model') || field === 'type' || field === 'failure_node' || field === 'recovery_method') {
            // models are objects, so compare by name
            switch (type) {
                case 'asc':
                    return a[field].name.localeCompare(b[field].name)
                case 'desc':
                    return b[field].name.localeCompare(a[field].name)
                default:
                    return 0
            }
        } else if (field === 'client' || field === 'service_company' || field === 'maintenance_carry_out') {
            // client and service company are objects, so compare by org_name
            let a_name = a[field]?.org_name ?? ''
            let b_name = b[field]?.org_name ?? ''
            switch (type) {
                case 'asc':
                    return a_name.localeCompare(b_name)
                case 'desc':
                    return b_name.localeCompare(a_name)
                default:
                    return 0
            }
        } else if (field.includes('date')) {
            let res
            switch (type) {
                case 'asc':
                    res = Date.parse(a[field]) - Date.parse(b[field])
                    return isNaN(res) ? 1 : res
                case 'desc':
                    res = Date.parse(b[field]) - Date.parse(a[field])
                    return isNaN(res) ? -1 : res
                default:
                    return 0
            }
        } else if (field === 'machine') {
            switch (type) {
                case 'asc':
                    return a[field].serial_number.localeCompare(b[field].serial_number)
                case 'desc':
                    return b[field].serial_number.localeCompare(a[field].serial_number)
                default:
                    return 0
            }
        } else if (field === 'production' || field === 'downtime') {
            switch (type) {
                case 'asc':
                    return a[field] - b[field]
                case 'desc':
                    return b[field] - a[field]
                default:
                    return 0
            }
        }
    })
}