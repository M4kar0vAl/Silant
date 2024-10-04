import { Select } from '..'
import { useTableData, useTableDataDispatch } from '../../context'
import './Sort.css'

const Sort = () => {
    const dispatch = useTableDataDispatch()
    const tableData = useTableData()

    let tab, sorting
    if (tableData) {
        const {tab: tab_, sorting: sorting_} = tableData
        tab = tab_
        sorting = sorting_
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

    return (
        <div className='auth-sort'>
            <h3 className='auth-heading'>Сортировка</h3>
            <div className='auth-sort-form'>
                <div className='sort-form-input'>
                    <Select
                        id='sort-field'
                        name='sort-field'
                        label='Столбец:'
                        type='sort'
                        onChange={handleInputChange}
                        value={sorting?.field}
                        choices={getSortFieldChoices(tab)}
                    />
                </div>
                <div className='sort-form-input'>
                    <Select
                        id='sort-type'
                        name='sort-type'
                        label='Тип:'
                        type='sort'
                        onChange={handleInputChange}
                        defaultOptionLabel='Не сортировать'
                        value={sorting?.type}
                        choices={[{name: 'По возрастанию' , value: 'asc'}, {name: 'По убыванию', value: 'desc'}]}
                    /> 
                </div>
            </div>
            <button onClick={handleClick}>Сортировка по умолчанию</button>
        </div>
    )
}

function getSortFieldChoices(tab) {
    switch (tab) {
        case 'machine':
            return [
                {
                    name: 'Заводской номер',
                    value: 'serial_number'
                },
                {
                    name: 'Модель техники',
                    value: 'equipment_model'
                },
                {
                    name: 'Модель двигателя',
                    value: 'engine_model'
                },
                {
                    name: 'Заводской номер двигателя',
                    value: 'engine_serial_number'
                },
                {
                    name: 'Модель трансмиссии',
                    value: 'transmission_model'
                },
                {
                    name: 'Заводской номер трансмиссии',
                    value: 'transmission_serial_number'
                },
                {
                    name: 'Модель ведущего моста',
                    value: 'drive_axle_model'
                },
                {
                    name: 'Заводской номер ведущего моста',
                    value: 'drive_axle_serial_number'
                },
                {
                    name: 'Модель управляемого моста',
                    value: 'controlled_bridge_model'
                },
                {
                    name: 'Заводской номер управляемого моста',
                    value: 'controlled_bridge_serial_number'
                },
                {
                    name: 'Дата отгрузки с завода',
                    value: 'shipment_date'
                },
                {
                    name: 'Клиент',
                    value: 'client'
                },
                {
                    name: 'Грузополучатель',
                    value: 'consignee'
                },
                {
                    name: 'Дата договора',
                    value: 'contractDate'
                },
                {
                    name: 'Сервисная компания',
                    value: 'service_company'
                }
            ]
        case 'maintenance':
            return [
                {
                    name: 'Машина',
                    value: 'machine'
                },
                {
                    name: 'Вид ТО',
                    value: 'type'
                },
                {
                    name: 'Дата ТО',
                    value: 'date'
                },
                {
                    name: 'Наработка',
                    value: 'production'
                },
                {
                    name: 'Номер заказ-наряда',
                    value: 'work_order_number'
                },
                {
                    name: 'Дата заказ-наряда',
                    value: 'work_order_date'
                },
                {
                    name: 'Организация, проводившая ТО',
                    value: 'maintenance_carry_out'
                },
                {
                    name: 'Сервисная компания',
                    value: 'service_company'
                }
            ]
        case 'reclamation':
            return [
                {
                    name: 'Машина',
                    value: 'machine'
                },
                {
                    name: 'Наработка',
                    value: 'production'
                },
                {
                    name: 'Узел отказа',
                    value: 'failure_node'
                },
                {
                    name: 'Способ восстановления',
                    value: 'recovery_method'
                },
                {
                    name: 'Дата отказа',
                    value: 'failure_date'
                },
                {
                    name: 'Дата восстановления',
                    value: 'recovery_date'
                },
                {
                    name: 'Время простоя',
                    value: 'downtime'
                },
                {
                    name: 'Сервисная компания',
                    value: 'service_company'
                }
            ]
        default:
            return []
    }
}

export default Sort