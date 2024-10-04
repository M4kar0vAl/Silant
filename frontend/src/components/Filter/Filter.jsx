import { MachineFilter, MaintenanceFilter, ReclamationFilter} from '..'
import { useTableData, useTableDataDispatch } from '../../context'
import { getInitialFilters } from '../../utils'

import './Filter.css'

const Filter = () => {
    const dispatch = useTableDataDispatch()
    const tableData = useTableData()

    let tab
    if (tableData) {
        const {tab: tab_} = tableData
        tab = tab_
    }

    let content
    switch (tab) {
        case 'machine':
            content = <MachineFilter />
            break;
        case 'maintenance':
            content = <MaintenanceFilter />
            break;
        case 'reclamation':
            content = <ReclamationFilter />
            break;
    }
    
    function handleClick() {
        dispatch({
            type: 'setFilters',
            filters: getInitialFilters(tab)
        })
    }

    return (
        <div className='auth-filter'>
            <h3 className='auth-heading'>Фильтры</h3>
            {content}
            <button onClick={handleClick}>Сбросить фильтры</button>
        </div>
    )
}

export default Filter