import { Select } from '..'
import {
    EQUIPMENT_MODEL,
    ENGINE_MODEL,
    TRANSMISSION_MODEL,
    DRIVE_AXLE_MODEL,
    CONTROLLED_BRIDGE_MODEL
} from '../../constants'
import { useTableDataDispatch } from '../../context'
import { useCatalog, useFilters } from '../../hooks'

import './MachineFilter.css'

const MachineFilter = () => {
    const catalog = useCatalog([
        EQUIPMENT_MODEL,
        ENGINE_MODEL,
        TRANSMISSION_MODEL,
        DRIVE_AXLE_MODEL,
        CONTROLLED_BRIDGE_MODEL
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
                id='equipmentModel'
                name='equipment_model'
                label='Модель техники:'
                defaultOptionLabel={catalog ? null : 'Загрузка...'}
                disabled={!catalog}
                type='catalog'
                value={filters?.equipment_model}
                choices={catalog?.filter((obj) => obj.entity === EQUIPMENT_MODEL) ?? []}
                onChange={handleInputChange}
            />
            <Select
                id='engineModel'
                name='engine_model'
                label='Модель двигателя:'
                defaultOptionLabel={catalog ? null : 'Загрузка...'}
                disabled={!catalog}
                type='catalog'
                value={filters?.engine_model}
                choices={catalog?.filter((obj) => obj.entity === ENGINE_MODEL) ?? []}
                onChange={handleInputChange}
            />
            <Select
                id='transmissionModel'
                name='transmission_model'
                label='Модель трансмисии:'
                defaultOptionLabel={catalog ? null : 'Загрузка...'}
                disabled={!catalog}
                type='catalog'
                value={filters?.transmission_model}
                choices={catalog?.filter((obj) => obj.entity === TRANSMISSION_MODEL) ?? []}
                onChange={handleInputChange}
            />
            <Select
                id='driveAxleModel'
                name='drive_axle_model'
                label='Модель ведущего моста:'
                defaultOptionLabel={catalog ? null : 'Загрузка...'}
                disabled={!catalog}
                type='catalog'
                value={filters?.drive_axle_model}
                choices={catalog?.filter((obj) => obj.entity === DRIVE_AXLE_MODEL) ?? []}
                onChange={handleInputChange}
            />
            <Select
                id='controlledBridgeModel'
                name='controlled_bridge_model'
                label='Модель управляемого моста:'
                defaultOptionLabel={catalog ? null : 'Загрузка...'}
                disabled={!catalog}
                type='catalog'
                value={filters?.controlled_bridge_model}
                choices={catalog?.filter((obj) => obj.entity === CONTROLLED_BRIDGE_MODEL) ?? []}
                onChange={handleInputChange}
            />
        </>
    )
}

export default MachineFilter