import { useNavigate } from 'react-router-dom'

import { Loader } from '..'
import { useAuth, useShortMachineData, useTableData } from '../../context'
import { useFilteredData, useSortedData } from '../../hooks'
import { addLineBreak, formatDate } from '../../utils'

import './ResultTable.css'

const ResultTable = () => {
    const isAuthenticated = !!useAuth()
    const machineData = useShortMachineData()
    const tableData = useTableData()
    const filteredData = useFilteredData()
    const sortedData = useSortedData(filteredData)
    const isLoading = !sortedData
    const navigate = useNavigate()
    
    let tab
    if (tableData) {
        const {tab: tab_} = tableData
        tab = tab_
    }

    let table
    if (isAuthenticated) {
        if (!isLoading) {
            table = getTable(sortedData, isAuthenticated, tab, navigate)
        }
    } else {
        if (machineData?.machine && !machineData.notFound) {
            table = getTable(machineData.machine, isAuthenticated)
        }
    }

    return (
        <>
            {
                isAuthenticated
                ?
                    isLoading
                    ?
                    <Loader />
                    :
                    <>
                        <p className='table-tip'>Нажмите на строку таблицы, чтобы открыть полную информацию</p>
                        <div className="table-container">
                            {table}
                        </div>
                    </>
                :
                    machineData
                    ?
                        machineData.machine
                        ?
                        // if there is machine, then everuthing is fine, request ended up with status = 200
                        <div className="table-container">
                            {table}
                        </div>
                        :
                            machineData.notFound
                            ?
                            // no machine and notFound = true means that request ended up with not found error
                            <p className='search-not-found'>Машины с таким номером не существует!</p>
                            :
                            // no machine and notFound = false means that request is pending rn 
                            <Loader />
                    :
                    // no machineData in localStorage means that nothing was requested yet.
                    // This is true when user opens home page in the first time
                    null
            }
        </>
    )
}

function getTable(data, isAuthenticated, type, navigate) {
    if (isAuthenticated && !type) return
    let res

    if (isAuthenticated) {
        switch (type) {
            case 'machine':
                res = (
                    <table className="search-table">
                        <thead>
                            <tr>
                                <th>Зав. номер машины</th>
                                <th>Модель техники</th>
                                <th>Модель двигателя</th>
                                <th>Зав. номер двигателя</th>
                                <th>Модель трансмиссии</th>
                                <th>Зав. номер трансмиссии</th>
                                <th>Модель ведущего моста</th>
                                <th>Зав. номер ведущего моста</th>
                                <th>Модель управляемого моста</th>
                                <th>Зав. номер управляемого моста</th>
                                <th>Дата отгрузки с завода</th>
                                <th>Клиент</th>
                                <th>Грузополучатель</th>
                                <th>Адрес поставки</th>
                                <th>Номер договора</th>
                                <th>Дата договора</th>
                                <th>Комплектация (доп. опции)</th>
                                <th>Сервисная компания</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((obj) => (
                                <tr key={obj.serial_number} onClick={() => navigate(`/machine/${obj.serial_number}`, {state: {'machine': obj}})}>
                                    <td>{obj.serial_number}</td>
                                    <td>{obj.equipment_model?.name}</td>
                                    <td>{obj.engine_model?.name}</td>
                                    <td>{obj.engine_serial_number}</td>
                                    <td>{obj.transmission_model?.name}</td>
                                    <td>{obj.transmission_serial_number}</td>
                                    <td>{obj.drive_axle_model?.name}</td>
                                    <td>{obj.drive_axle_serial_number}</td>
                                    <td>{obj.controlled_bridge_model?.name}</td>
                                    <td>{obj.controlled_bridge_serial_number}</td>
                                    <td>{formatDate(obj.shipment_date)}</td>
                                    <td>{obj.client?.org_name}</td>
                                    <td>{obj.consignee}</td>
                                    <td>{obj.delivery_address}</td>
                                    <td>{obj.supply_contract_number_date.split(', ')[0]}</td>
                                    <td>{formatDate(obj.supply_contract_number_date.split(', ')[1])}</td>
                                    <td className='complectation-cell'>{addLineBreak(obj.additional_equipment) ?? 'Стандарт'}</td>
                                    <td>{obj.service_company?.org_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                break;
            case 'maintenance':
                res = (
                    <table className="search-table">
                        <thead>
                            <tr>
                                <th>Машина</th>
                                <th>Вид ТО</th>
                                <th>Дата ТО</th>
                                <th>Наработка м/час</th>
                                <th>Номер заказ-наряда</th>
                                <th>Дата заказ-наряда</th>
                                <th>Организация, проводившая ТО</th>
                                <th>Сервисная компания</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((obj) => (
                                <tr key={obj.id} onClick={() => navigate(`/maintenance/${obj.id}`, {state: {'maintenance': obj}})}>
                                    <td>{obj.machine.serial_number}</td>
                                    <td>{obj.type.name}</td>
                                    <td>{formatDate(obj.date)}</td>
                                    <td>{obj.production}</td>
                                    <td>{obj.work_order_number}</td>
                                    <td>{formatDate(obj.work_order_date)}</td>
                                    <td>{obj.maintenance_carry_out?.org_name || 'Самостоятельно'}</td>
                                    <td>{obj.service_company.org_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                break;
            case 'reclamation':
                res = (
                    <table className="search-table">
                        <thead>
                            <tr>
                                <th>Машина</th>
                                <th>Наработка м/час</th>
                                <th>Узел отказа</th>
                                <th>Описание отказа</th>
                                <th>Способ восстановления</th>
                                <th>Запасные части</th>
                                <th>Дата отказа</th>
                                <th>Дата восстановления</th>
                                <th>Время простоя</th>
                                <th>Сервисная компания</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((obj) => (
                                <tr key={obj.id} onClick={() => navigate(`/reclamation/${obj.id}`, {state: {'reclamation': obj}})}>
                                    <td>{obj.machine.serial_number}</td>
                                    <td>{obj.production}</td>
                                    <td>{obj.failure_node.name}</td>
                                    <td>{obj.failure_description}</td>
                                    <td>{obj.recovery_method.name}</td>
                                    <td>{
                                        obj.spare_parts
                                        ?
                                        addLineBreak(obj.spare_parts)
                                        :
                                        'Нет'
                                    }</td>
                                    <td>{formatDate(obj.failure_date)}</td>
                                    <td>{formatDate(obj.recovery_date)}</td>
                                    <td>{obj.downtime}</td>
                                    <td>{obj.service_company.org_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                break;
            default:
                throw Error(`Unknown type: ${type}`)
        }
    } else {
        res = (
            <table className="search-table">
                <thead>
                    <tr>
                        <th>Зав. номер машины</th>
                        <th>Модель техники</th>
                        <th>Модель двигателя</th>
                        <th>Зав. номер двигателя</th>
                        <th>Модель трансмиссии</th>
                        <th>Зав. номер трансмиссии</th>
                        <th>Модель ведущего моста</th>
                        <th>Зав. номер ведущего моста</th>
                        <th>Модель управляемого моста</th>
                        <th>Зав. номер управляемого моста</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='unclickable'>
                        <td>{data.serial_number}</td>
                        <td>{data.equipment_model.name}</td>
                        <td>{data.engine_model.name}</td>
                        <td>{data.engine_serial_number}</td>
                        <td>{data.transmission_model.name}</td>
                        <td>{data.transmission_serial_number}</td>
                        <td>{data.drive_axle_model.name}</td>
                        <td>{data.drive_axle_serial_number}</td>
                        <td>{data.controlled_bridge_model.name}</td>
                        <td>{data.controlled_bridge_serial_number}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    return res
}

export default ResultTable