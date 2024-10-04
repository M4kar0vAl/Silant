import { Input, Select } from '..'
import { MAINTENANCE_TYPE, SERVICE } from '../../constants'
import { useTableDataDispatch } from '../../context'
import { useCatalog, useFilters, useUsersCatalog } from '../../hooks'

import './MaintenanceFilter.css'

const MaintenanceFilter = () => {
    const catalog = useCatalog([
        MAINTENANCE_TYPE
    ])

    const usersCatalog = useUsersCatalog([
        SERVICE
    ])

    const dispatch = useTableDataDispatch()
    const filters = useFilters()

    function handleInputChange(e) {
        const {name, value} = e.target

        dispatch({
            type: 'setFilters',
            filters: {
                ...filters,
                [name]: value
            }
        })
    }

    return (
        <>
            <Select
                id='type'
                name='type'
                label='Вид ТО:'
                defaultOptionLabel={catalog ? null : 'Загрузка...'}
                disabled={!catalog}
                value={filters?.type}
                type='catalog'
                choices={catalog ?? []}
                onChange={handleInputChange}
            />
            <Input
                id='machine_serial_number'
                name='machine_serial_number'
                label='Заводской номер машины:'
                value={filters?.machine_serial_number}
                placeholder='4 - 10 цифр'
                type='text'
                onChange={handleInputChange}
            />
            <Select
                id='service_company'
                name='service_company'
                label='Сервисная компания'
                defaultOptionLabel={usersCatalog ? null : 'Загрузка...'}
                disabled={!usersCatalog}
                value={filters?.service_company}
                type='user'
                choices={usersCatalog ?? []}
                onChange={handleInputChange}
            />
        </>
    )
}

export default MaintenanceFilter