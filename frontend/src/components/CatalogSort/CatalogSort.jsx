import { Select } from '..'
import { useCatalogData, useCatalogDataDispatch } from '../../context'
import './CatalogSort.css'

const CatalogSort = () => {
    const dispatch = useCatalogDataDispatch()
    const catalogData = useCatalogData()

    let sorting
    if (catalogData) {
        const {sorting: sorting_} = catalogData
        sorting = sorting_
    }

    function handleInputChange(e) {
        const {name, value} = e.target

        switch (name) {
            case 'sort-field':
                dispatch({
                    type: 'setSorting',
                    sorting: {
                        ...sorting,
                        field: value
                    }
                })
                break;
            case 'sort-type':
                dispatch({
                    type: 'setSorting',
                    sorting: {
                        ...sorting,
                        type: value
                    }
                })
                break;
        }        
    }

    function handleClick() {
        dispatch({
            type: 'setSorting',
            sorting: {
                field: '',
                type: ''
            }
        })
    }

    return (
        <div className='catalog-filter'>
            <h2 className='catalog-filter-heading'>Сортировка</h2>
            <div className='catalog-filter-input'>
                <Select
                    id='catalog-sort-field'
                    name='sort-field'
                    label='Сортировать:'
                    type='sort'
                    value={sorting?.field}
                    onChange={handleInputChange}
                    choices={[{name: 'Название', value: 'name'}, {name: 'Объект', value: 'entity'}]}
                />
            </div>
            <div className='catalog-filter-input'>
                <Select
                    id='catalog-sort-type'
                    name='sort-type'
                    label='Тип:'
                    defaultOptionLabel='Не сортировать'
                    type='sort'
                    value={sorting?.type}
                    onChange={handleInputChange}
                    choices={[{name: 'По возрастанию' , value: 'asc'}, {name: 'По убыванию', value: 'desc'}]}
                />
            </div>
            <button onClick={handleClick}>Сортировка по умолчанию</button>
        </div>
    )
}

export default CatalogSort