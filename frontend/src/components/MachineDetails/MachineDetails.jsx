import { Input, Select } from '..'
import {
    ENGINE_MODEL,
    EQUIPMENT_MODEL,
    TRANSMISSION_MODEL,
    DRIVE_AXLE_MODEL,
    CONTROLLED_BRIDGE_MODEL,
    CLIENT,
    SERVICE,
    MANAGER
} from "../../constants"
import { useUserData } from '../../context'
import { useEditing, useMachineForm } from "../../hooks"
import { formatDate, addLineBreak } from "../../utils"

import './MachineDetails.css'

const MachineDetails = ({ machine }) => {
    const role = useUserData().role

    const {
        formData,
        setFormData,
        formErrors,
        setFormErrors,
        contract,
        contractErrors,
        alreadyExists,
        isDisabled,
        isPending,
        setAlreadyExistsError,
        catalog,
        usersCatalog,
        handleInputChange,
        handleContractChange,
        handleSubmit,
    } = useMachineForm(machine)
    
    const {
        isEditing,
        handleSaveClick,
        handleDissmissClick
    } = useEditing('machine', machine, setFormData, setFormErrors, handleSubmit, setAlreadyExistsError)

    return (
        <>
            <h1 className='details-title'>Машина</h1>
            {
                isEditing
                ?
                <>
                    <div className="details-form-input as-subtitle">
                        <Input
                            id='serialNumber'
                            name='serial_number'
                            label='Заводской номер:'
                            value={formData.serial_number}
                            placeholder='4-10 цифр'
                            error={formErrors.serial_number}
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                    {alreadyExists && <p className="error">Машина с таким заводским номером<br /> уже существует</p>}
                </>
                :
                <h2 className='details-subtitle'>Заводской номер: {machine.serial_number}</h2>
            }
            <div className='details-content'>
                <div className="details-content-block">
                    <h3 className='details-heading'>Модель</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className="details-form-input">
                                <Select
                                    id='equipmentModelId'
                                    name='equipment_model'
                                    label='Название:'
                                    defaultOptionLabel={catalog ? null : 'Загрузка...'}
                                    disabled={!catalog}
                                    value={formData.equipment_model}
                                    onChange={handleInputChange}
                                    choices={catalog?.filter((obj) => obj.entity === EQUIPMENT_MODEL) ?? []}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span className="bold">Название:</span> {machine.equipment_model.name}</p>
                        </>
                    }
                    <p className='details-text'><span className="bold">Описание:</span> <span>{machine.equipment_model.description}</span></p>
                </div>
                
                <div className="details-content-block">
                    <h3 className='details-heading'>Двигатель</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className="details-form-input">
                                <Select
                                    id='engineModelId'
                                    name='engine_model'
                                    label='Модель:'
                                    defaultOptionLabel={catalog ? null : 'Загрузка...'}
                                    disabled={!catalog}
                                    value={formData.engine_model}
                                    onChange={handleInputChange}
                                    choices={catalog?.filter((obj) => obj.entity === ENGINE_MODEL) ?? []}
                                />
                            </div>
                            <div className="details-form-input">
                                <Input
                                    id='engineSerialNumber'
                                    name='engine_serial_number'
                                    label='Заводской номер:'
                                    value={formData.engine_serial_number}
                                    placeholder='6-10 символов. Цифры и загл. буквы'
                                    error={formErrors.engine_serial_number}
                                    type='text'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span className="bold">Модель:</span> {machine.engine_model.name}</p>
                            <p className='details-text'><span className="bold">Заводской номер:</span> {machine.engine_serial_number}</p>
                        </>
                    }
                    <p className='details-text'><span className="bold">Описание:</span> <span>{machine.engine_model.description}</span></p>
                </div>

                <div className="details-content-block">
                    <h3 className='details-heading'>Трансмиссия</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className="details-form-input">
                                <Select
                                    id='transmissionModelId'
                                    name='transmission_model'
                                    label='Модель:'
                                    defaultOptionLabel={catalog ? null : 'Загрузка...'}
                                    disabled={!catalog}
                                    value={formData.transmission_model}
                                    onChange={handleInputChange}
                                    choices={catalog?.filter((obj) => obj.entity === TRANSMISSION_MODEL) ?? []}
                                />
                            </div>
                            <div className="details-form-input">
                                <Input
                                    id='transmissionSerialNumber'
                                    name='transmission_serial_number'
                                    label='Заводской номер:'
                                    value={formData.transmission_serial_number}
                                    placeholder='6-10 символов. Цифры и загл. буквы'
                                    error={formErrors.transmission_serial_number}
                                    type='text'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span className="bold">Модель:</span> {machine.transmission_model.name}</p>
                            <p className='details-text'><span className="bold">Заводской номер:</span> {machine.transmission_serial_number}</p>
                        </>
                    }
                    <p className='details-text'><span className="bold">Описание:</span> <span>{machine.transmission_model.description}</span></p>
                </div>
                
                <div className="details-content-block">
                    <h3 className='details-heading'>Ведущий мост</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className="details-form-input">
                                <Select
                                    id='driveAxleModelId'
                                    name='drive_axle_model'
                                    label='Модель:'
                                    defaultOptionLabel={catalog ? null : 'Загрузка...'}
                                    disabled={!catalog}
                                    value={formData.drive_axle_model}
                                    onChange={handleInputChange}
                                    choices={catalog?.filter((obj) => obj.entity === DRIVE_AXLE_MODEL) ?? []}
                                />
                            </div>
                            <div className="details-form-input">
                                <Input
                                    id='driveAxleSerialNumber'
                                    name='drive_axle_serial_number'
                                    label='Заводской номер:'
                                    value={formData.drive_axle_serial_number}
                                    placeholder='6-10 символов. Цифры и загл. буквы'
                                    error={formErrors.drive_axle_serial_number}
                                    type='text'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span className="bold">Модель:</span> {machine.drive_axle_model.name}</p>
                            <p className='details-text'><span className="bold">Заводской номер:</span> {machine.drive_axle_serial_number}</p>
                        </>
                    }
                    <p className='details-text'><span className="bold">Описание:</span> <span>{machine.drive_axle_model.description}</span></p>
                </div>
                
                <div className="details-content-block">
                    <h3 className='details-heading'>Управляемый мост</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className="details-form-input">
                                <Select
                                    id='controlledBridgeModelId'
                                    name='controlled_bridge_model'
                                    label='Модель:'
                                    defaultOptionLabel={catalog ? null : 'Загрузка...'}
                                    disabled={!catalog}
                                    value={formData.controlled_bridge_model}
                                    onChange={handleInputChange}
                                    choices={catalog?.filter((obj) => obj.entity === CONTROLLED_BRIDGE_MODEL) ?? []}
                                />
                            </div>
                            <div className="details-form-input">
                                <Input
                                    id='controlledBridgeSerialNumber'
                                    name='controlled_bridge_serial_number'
                                    label='Заводской номер:'
                                    value={formData.controlled_bridge_serial_number}
                                    placeholder='6-10 символов. Цифры и загл. буквы'
                                    error={formErrors.controlled_bridge_serial_number}
                                    type='text'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span className="bold">Модель:</span> {machine.controlled_bridge_model.name}</p>
                            <p className='details-text'><span className="bold">Заводской номер:</span> {machine.controlled_bridge_serial_number}</p>
                        </>
                    }
                    <p className='details-text'><span className="bold">Описание:</span> <span>{machine.controlled_bridge_model.description}</span></p>
                </div>

                <div className="details-content-block">
                    <h3 className='details-heading'>Комплектация (доп. опции)</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className="details-form-input">
                                <Input
                                    id='additionalEquipment'
                                    name='additional_equipment'
                                    value={formData.additional_equipment}
                                    placeholder='; для разделения'
                                    type='text'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'>{addLineBreak(machine.additional_equipment) ?? 'Стандарт'}</p>
                        </>
                    }
                </div>

                <div className="details-content-block">
                    <h3 className='details-heading'>Клиент</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className="details-form-input">
                                <Select
                                    id='client'
                                    name='client'
                                    label='Покупатель'
                                    defaultOptionLabel={usersCatalog ? null : 'Загрузка...'}
                                    disabled={!usersCatalog}
                                    type='user'
                                    value={formData.client}
                                    onChange={handleInputChange}
                                    choices={usersCatalog?.filter((obj) => obj.role === CLIENT) ?? []}
                                    error={formErrors.client}
                                />
                            </div>
                            {formErrors.client && <p className="error">Это поле обязательно, если указана<br/>сервисная компания</p>}
                            <div className="details-form-input">
                                <Input
                                    id='consignee'
                                    name='consignee'
                                    label='Грузополучатель:'
                                    value={formData.consignee}
                                    placeholder='Не более 256 символов'
                                    error={formErrors.consignee}
                                    type='text'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="details-form-input">
                                <Input
                                    id='shipmentDate'
                                    name='shipment_date'
                                    label='Дата отгрузки с завода:'
                                    value={formData.shipment_date}
                                    type='date'
                                    onChange={handleInputChange}
                                    error={formErrors.shipment_date}
                                />
                            </div>
                            <div className="details-form-input">
                                <Input
                                    id='contractNumber'
                                    name='contractNumber'
                                    label='№ договора:'
                                    value={contract.contractNumber}
                                    placeholder='10 цифр'
                                    error={contractErrors.contractNumber}
                                    type='text'
                                    onChange={handleContractChange}
                                />
                            </div>
                                {contractErrors.contractNumber && <p className='error'>{contractErrors.contractNumber}</p>}
                            <div className="details-form-input">
                                <Input
                                    id='contractDate'
                                    name='contractDate'
                                    label='Дата договора:'
                                    value={contract.contractDate}
                                    type='date'
                                    onChange={handleContractChange}
                                    error={contractErrors.contractDate}
                                />
                            </div>
                                {contractErrors.contractDate && <p className='error'>{contractErrors.contractDate}</p>}
                            <div className="details-form-input">
                                <Input
                                    id='deliveryAddress'
                                    name='delivery_address'
                                    label='Адрес поставки:'
                                    value={formData.delivery_address}
                                    placeholder='Не более 256 символов'
                                    error={formErrors.delivery_address}
                                    type='text'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span className="bold">Покупатель:</span> {machine.client?.org_name}</p>
                            <p className='details-text'><span className="bold">Грузополучатель:</span> {machine.consignee}</p>
                            <p className='details-text'><span className="bold">Дата отгрузки с завода:</span> {formatDate(machine.shipment_date)}</p>
                            <p className='details-text'><span className="bold">№ договора:</span> {machine.supply_contract_number_date?.split(', ')[0]}</p>
                            <p className='details-text'><span className="bold">Дата договора:</span> {formatDate(machine.supply_contract_number_date?.split(', ')[1])}</p>
                            <p className='details-text'><span className="bold">Адрес поставки:</span> {machine.delivery_address}</p>    
                        </>
                    }
                </div>

                <div className="details-content-block">
                    <h3 className='details-heading'>Сервисная компания</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className="details-form-input">
                                <Select
                                    id='serviceCompany'
                                    name='service_company'
                                    defaultOptionLabel={usersCatalog ? null : 'Загрузка...'}
                                    disabled={!usersCatalog}
                                    type='user'
                                    value={formData.service_company}
                                    onChange={handleInputChange}
                                    choices={usersCatalog?.filter((obj) => obj.role === SERVICE) ?? []}
                                    error={formErrors.service_company}
                                />
                            </div>
                            {formErrors.service_company && <p className="error">Это поле обязательно, если указан<br/>клиент</p>}
                        </>
                        :
                        <>
                            <p className="details-text"><span className="bold">{machine.service_company?.org_name}</span></p>
                        </>
                    }
                </div>
            </div>
            {
                role === MANAGER
                &&
                <div className="edit-btn-container">
                    <button className="edit-btn" onClick={handleSaveClick} disabled={isEditing && (isDisabled || isPending)}>
                        {isEditing ? 'Сохранить' : 'Редактировать'}
                    </button>
                    {
                        isEditing
                        &&
                        <button className="edit-btn" onClick={handleDissmissClick}>Отмена</button>
                    }
                </div>
            }
        </>
    )
}

export default MachineDetails