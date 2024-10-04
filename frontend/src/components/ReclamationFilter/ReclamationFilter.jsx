import { Select } from '..'
import { FAILURE_NODE, RECOVERY_METHOD, SERVICE } from '../../constants'
import { useTableDataDispatch } from '../../context'
import { useCatalog, useFilters, useUsersCatalog } from '../../hooks'

import './ReclamationFilter.css'

const ReclamationFilter = () => {
    const catalog = useCatalog([
        FAILURE_NODE,
        RECOVERY_METHOD
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
                id='failure_node'
                name='failure_node'
                label='Узел отказа:'
                defaultOptionLabel={catalog ? null : 'Загрузка...'}
                disabled={!catalog}
                value={filters?.failure_node}
                choices={catalog?.filter((obj) => obj.entity === FAILURE_NODE) ?? []}
                onChange={handleInputChange}
            />
            <Select
                id='recovery_method'
                name='recovery_method'
                label='Способ восстановления:'
                defaultOptionLabel={catalog ? null : 'Загрузка...'}
                disabled={!catalog}
                value={filters?.recovery_method}
                choices={catalog?.filter((obj) => obj.entity === RECOVERY_METHOD) ?? []}
                onChange={handleInputChange}
            />
            <Select
                id='service_company'
                name='service_company'
                label='Сервисная компания:'
                defaultOptionLabel={usersCatalog ? null : 'Загрузка...'}
                disabled={!usersCatalog}
                value={filters?.service_company}
                choices={usersCatalog ?? []}
                type='user'
                onChange={handleInputChange}
            />
        </>
    )
}

export default ReclamationFilter