import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ResultTable, Filter, Sort } from '..'
import { BASE_URL} from '../../constants'
import { useAuth, useCatalogDataDispatch, useTableData, useTableDataDispatch, useUserData } from '../../context'
import { checkCreatePermission, getInitialFilters } from '../../utils'

import './SearchResult.css'

const SearchResult = () => {
    const isAuthenticated = !!useAuth()
    const userData = useUserData()
    const tableData = useTableData()
    const dispatch = useTableDataDispatch()
    const catalogDataDispatch = useCatalogDataDispatch()
    const navigate = useNavigate()

    let filters, tab, sorting
    if (tableData) {
        const {filters: filters_, tab: tab_, sorting: sorting_} = tableData
        filters = filters_
        tab = tab_
        sorting = sorting_
    }

    useEffect(() => {
        if (isAuthenticated) {
            let ignore = false
            
            async function fetchData() {
                if (tab) {
                    const URL = `${BASE_URL}/${tab}/`
                    const resp =  await axios.get(URL)
                    if (!ignore) {
                        dispatch({
                            type: 'setInitialData',
                            initialData: resp.data
                        })
                        if (!filters) {
                            dispatch({
                                type: 'setFilters',
                                filters: getInitialFilters(tab)
                            })
                        }
                        if (!sorting) {
                            dispatch({
                                type: 'setSorting',
                                sorting: {
                                    field: '',
                                    type: ''
                                }
                            })
                        }
                    }
                } else {
                    dispatch({
                        type: 'setTab',
                        tab: 'machine'
                    })
                }
            }

            fetchData()
            
            catalogDataDispatch({
                type: 'clearCatalogData'
            })

            return () => ignore = true
        }
    }, [isAuthenticated, tab, filters, sorting, dispatch, catalogDataDispatch])

    return (
        <>
            <h2 className='search-subtitle'>
                Информация о комплектации и технических характеристиах <span style={{'whiteSpace': 'nowrap'}}>Вашей техники</span>
            </h2>
            {
                isAuthenticated
                &&
                <div className='toggle-btn-container'>
                    <button 
                        className='toggle-btn'
                        onClick={() => {
                            dispatch({
                                type: 'clearTableData'
                            })
                            dispatch({
                                type: 'setTab',
                                tab: 'machine'
                            })
                        }}
                        disabled={tab === 'machine'}
                    >
                        Технические данные
                    </button>
                    <button
                        className='toggle-btn'
                        onClick={() => {
                            dispatch({
                                type: 'clearTableData'
                            })
                            dispatch({
                                type: 'setTab',
                                tab: 'maintenance'
                            })
                        }}
                        disabled={tab === 'maintenance'}
                    >
                        ТО
                    </button>
                    <button
                        className='toggle-btn'
                        onClick={() => {
                            dispatch({
                                type: 'clearTableData'
                            })
                            dispatch({
                                type: 'setTab',
                                tab: 'reclamation'
                            })
                        }}
                        disabled={tab === 'reclamation'}
                    >
                        Рекламации
                    </button>
                </div>
            }
            {
                (isAuthenticated && checkCreatePermission(userData?.role, tab))
                &&
                <button
                    className='add-btn'
                    onClick={() => navigate(`/${tab}/create`)}
                >
                    {getAddButtonName(tab)}
                </button>
            }
            {
                isAuthenticated
                &&
                <Filter />
            }
            {
                isAuthenticated
                &&
                <Sort />
            }
            {
                isAuthenticated
                &&
                <button className='btn' onClick={() => navigate('/catalog/')}>Смотреть справочник</button>
            }
            <ResultTable />
        </>
    )
}

function getAddButtonName(tab) {
    let name = 'Добавить '
    switch (tab) {
        case 'machine':
            name += 'машину'
            break;
        case 'maintenance':
            name += 'ТО'
            break;
        case 'reclamation':
            name += 'рекламацию'
            break;
    }
    return name
}

export default SearchResult