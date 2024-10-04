import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { CatalogFilter, CatalogObject, CatalogSort, Loader } from '../../components'
import { MANAGER } from '../../constants'
import { useCatalogData, useCatalogDataDispatch, useUserData, useTableDataDispatch } from '../../context'
import { useCatalog, useFilteredCatalog, useSortedCatalog } from '../../hooks'

import './CatalogListPage.css'

const CatalogListPage = () => {
    const role = useUserData().role
    const catalog = useCatalog([])
    const catalogData = useCatalogData()
    const catalogDataDispatch = useCatalogDataDispatch()
    const tableDataDispatch = useTableDataDispatch()
    const filteredCatalog = useFilteredCatalog()
    const sortedCatalog = useSortedCatalog(filteredCatalog)
    const isLoading = !sortedCatalog

    let filters, sorting
    if (catalogData) {
        const {filters: filters_, sorting: sorting_} = catalogData
        filters = filters_
        sorting = sorting_
    }

    useEffect(() => {
        catalogDataDispatch({
            type: 'setInitialData',
            initialData: catalog
        })
        if (!filters) {
            catalogDataDispatch({
                type: 'setFilters',
                filters: {
                    name: '',
                    entity: '',
                }
            })
        }
        if (!sorting) {
            catalogDataDispatch({
                type: 'setSorting',
                sorting: {
                    field: '',
                    type: ''
                }
            })
        }

        tableDataDispatch({
            type: 'clearTableData'
        })
    }, [catalog, filters, catalogDataDispatch, tableDataDispatch])

    return (
        <div className='catalog-list-page-container'>
            <h1 className='catalog-list-title'>Справочник</h1>
            {
                role === MANAGER
                &&
                <Link to='/catalog/create' className='catalog-list-btn'>Добавить</Link>
            }
            <CatalogFilter />
            <CatalogSort />
            <div className='catalog-list'>
                {
                    isLoading
                    ?
                    <Loader light={true} />
                    :
                    sortedCatalog?.map((obj) => (
                        <CatalogObject key={obj.id} catalogObj={obj} />
                    ))
                }
            </div>
        </div>
    )
}

export default CatalogListPage