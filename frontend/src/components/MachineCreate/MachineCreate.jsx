import { Input, Select } from '..'
import {
    EQUIPMENT_MODEL,
    ENGINE_MODEL,
    TRANSMISSION_MODEL,
    DRIVE_AXLE_MODEL,
    CONTROLLED_BRIDGE_MODEL,
    CLIENT,
    SERVICE
} from '../../constants'
import { useMachineForm } from '../../hooks'

import './MachineCreate.css'

const MachineCreate = () => {
    const {
        formData,
        formErrors,
        contract,
        contractErrors,
        alreadyExists,
        catalog,
        usersCatalog,
        isDisabled,
        isPending,
        handleInputChange,
        handleContractChange,
        handleSubmit,
    } = useMachineForm()

    return (
        <>
            <h1 className='create-title'>Добавить машину</h1>
            <form className='create-form' onSubmit={handleSubmit}>
                <div className='create-required-fields'>
                    <div className='create-form-input'>
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
                        {alreadyExists && <p className='error'>Машина с таким заводским номером<br /> уже существует</p>}
                    </div>
                    <div className='create-form-input'>
                        <Select
                            id='equipmentModelId'
                            name='equipment_model'
                            label='Модель техники:'
                            defaultOptionLabel={catalog ? null : 'Загрузка...'}
                            disabled={!catalog}
                            value={formData.equipment_model}
                            onChange={handleInputChange}
                            choices={catalog?.filter((obj) => obj.entity === EQUIPMENT_MODEL) ?? []}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Select
                            id='engineModelId'
                            name='engine_model'
                            label='Модель двигателя:'
                            defaultOptionLabel={catalog ? null : 'Загрузка...'}
                            disabled={!catalog}
                            value={formData.engine_model}
                            onChange={handleInputChange}
                            choices={catalog?.filter((obj) => obj.entity === ENGINE_MODEL) ?? []}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Input
                            id='engineSerialNumber'
                            name='engine_serial_number'
                            label='Заводской номер двигателя:'
                            value={formData.engine_serial_number}
                            placeholder='6-10 символов. Цифры и загл. буквы'
                            error={formErrors.engine_serial_number}
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Select
                            id='transmissionModelId'
                            name='transmission_model'
                            label='Модель трансмиссии:'
                            defaultOptionLabel={catalog ? null : 'Загрузка...'}
                            disabled={!catalog}
                            value={formData.transmission_model}
                            onChange={handleInputChange}
                            choices={catalog?.filter((obj) => obj.entity === TRANSMISSION_MODEL) ?? []}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Input
                            id='transmissionSerialNumber'
                            name='transmission_serial_number'
                            label='Заводской номер трансмиссии:'
                            value={formData.transmission_serial_number}
                            placeholder='6-10 символов. Цифры и загл. буквы'
                            error={formErrors.transmission_serial_number}
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Select
                            id='driveAxleModelId'
                            name='drive_axle_model'
                            label='Модель ведущего моста:'
                            defaultOptionLabel={catalog ? null : 'Загрузка...'}
                            disabled={!catalog}
                            value={formData.drive_axle_model}
                            onChange={handleInputChange}
                            choices={catalog?.filter((obj) => obj.entity === DRIVE_AXLE_MODEL) ?? []}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Input
                            id='driveAxleSerialNumber'
                            name='drive_axle_serial_number'
                            label='Заводской номер ведущего моста:'
                            value={formData.drive_axle_serial_number}
                            placeholder='6-10 символов. Цифры и загл. буквы'
                            error={formErrors.drive_axle_serial_number}
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Select
                            id='controlledBridgeModelId'
                            name='controlled_bridge_model'
                            label='Модель управляемого моста:'
                            defaultOptionLabel={catalog ? null : 'Загрузка...'}
                            disabled={!catalog}
                            value={formData.controlled_bridge_model}
                            onChange={handleInputChange}
                            choices={catalog?.filter((obj) => obj.entity === CONTROLLED_BRIDGE_MODEL) ?? []}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Input
                            id='controlledBridgeSerialNumber'
                            name='controlled_bridge_serial_number'
                            label='Заводской номер управляемого моста:'
                            value={formData.controlled_bridge_serial_number}
                            placeholder='6-10 символов. Цифры и загл. буквы'
                            error={formErrors.controlled_bridge_serial_number}
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='create-unrequired-fields'>
                    <div className='create-form-input'>
                        <Input
                            id='contractNumber'
                            name='contractNumber'
                            label='Номер договора поставки:'
                            value={contract.contractNumber}
                            placeholder='10 цифр'
                            error={contractErrors.contractNumber}
                            type='text'
                            onChange={handleContractChange}
                        />
                        {contractErrors.contractNumber && <p className='error'>{contractErrors.contractNumber}</p>}
                    </div>
                    <div className='create-form-input'>
                        <Input
                            id='contractDate'
                            name='contractDate'
                            label='Дата договора поставки:'
                            value={contract.contractDate}
                            type='date'
                            onChange={handleContractChange}
                            error={contractErrors.contractDate}
                        />
                        {contractErrors.contractDate && <p className='error'>{contractErrors.contractDate}</p>}
                    </div>
                    <div className='create-form-input'>
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
                    <div className='create-form-input'>
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
                    <div className='create-form-input'>
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
                    <div className='create-form-input'>
                        <Input
                            id='additionalEquipment'
                            name='additional_equipment'
                            label='Комплектация (доп. опции)'
                            value={formData.additional_equipment}
                            placeholder='; для разделения'
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Select
                            id='client'
                            name='client'
                            label='Клиент'
                            defaultOptionLabel={usersCatalog ? null : 'Загрузка...'}
                            disabled={!usersCatalog}
                            type='user'
                            value={formData.client}
                            onChange={handleInputChange}
                            choices={usersCatalog?.filter((obj) => obj.role === CLIENT) ?? []}
                            error={formErrors.client}
                        />
                        {formErrors.client && <p className='error'>Это поле обязательно, если указана<br />сервисная компания</p>}
                    </div>
                    <div className='create-form-input'>
                        <Select
                            id='serviceCompany'
                            name='service_company'
                            label='Сервисная компания:'
                            defaultOptionLabel={usersCatalog ? null : 'Загрузка...'}
                            disabled={!usersCatalog}
                            type='user'
                            value={formData.service_company}
                            onChange={handleInputChange}
                            choices={usersCatalog?.filter((obj) => obj.role === SERVICE) ?? []}
                            error={formErrors.service_company}
                        />
                        {formErrors.service_company && <p className='error'>Это поле обязательно, если указан<br/>клиент</p>}
                    </div>
                </div>
                <button type='submit' disabled={isDisabled || isPending}>Добавить</button>
                <p className='create-form-tip'><span style={{ color: '#D20A11' }}>*</span> - обязательное поле</p>
            </form>
        </>
    )
}

export default MachineCreate