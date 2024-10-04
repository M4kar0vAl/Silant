import { Input, Select } from '..'
import { ENTITY_CHOICES } from '../../constants'
import { useCatalogData, useCatalogDataDispatch } from '../../context'

import './CatalogFilter.css'

const CatalogFilter = () => {
    const catalogData = useCatalogData()
    const dispatch = useCatalogDataDispatch()
    
    let filters
    if (catalogData) {
        const {filters: filters_} = catalogData
        filters = filters_
    }

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
    
    function handleResetClick() {
        dispatch({
            type: 'setFilters',
            filters: {
                name: '',
                entity: ''
            }
        })
    }

    return (
        <div className='catalog-filter'>
            <h2 className='catalog-filter-heading'>Фильтры</h2>
            <div className='catalog-filter-input'>
                <Input
                    id='name'
                    name='name'
                    label='Название:'
                    type='text'
                    value={filters?.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className='catalog-filter-input'>
                <Select
                    id='entity'
                    name='entity'
                    label='Объект:'
                    type='entity'
                    value={filters?.entity}
                    onChange={handleInputChange}
                    choices={Object.entries(ENTITY_CHOICES).map(([selectValue, selectName]) => ({name: selectName, value: selectValue}))}
                />
            </div>
            <button onClick={handleResetClick}>Сбросить фильтры</button>
        </div>
    )
}

export default CatalogFilter