import { Input, Select } from '..'
import { CLIENT, MANAGER, SERVICE } from '../../constants'
import { useUserData } from '../../context'
import { useMaintenanceForm, useEditing } from '../../hooks'
import { formatDate } from '../../utils'

import './MaintenanceDetails.css'

const MaintenanceDetails = ({ maintenance }) => {
    const {role, id} = useUserData()
    let canEdit
    switch (role) {
        case MANAGER:
            canEdit = true
            break;
        case SERVICE:
            canEdit = maintenance.maintenance_carry_out !== null && maintenance.maintenance_carry_out.id === id
            break;
        case CLIENT:
            canEdit = maintenance.machine.client.id === id && maintenance.maintenance_carry_out === null
            break;
    }

    const {
        formData,
        setFormData,
        formErrors,
        isDisabled,
        isPending,
        setFormErrors,
        handleInputChange,
        handleSubmit,
        catalog,
        usersCatalog,
        machinesCatalog
    } = useMaintenanceForm(maintenance)
    
    const {
        isEditing,
        handleSaveClick,
        handleDissmissClick
    } = useEditing('maintenance', maintenance, setFormData, setFormErrors, handleSubmit)

    return (
        <>
            <h1 className='details-title'>Техническое обслуживание</h1>
            {
                isEditing
                ?
                <>
                    <div className='details-form-input as-subtitle'>
                        <Select
                            id='machine'
                            name='machine'
                            label='Заводской номер машины:'
                            defaultOptionLabel={machinesCatalog ? null : 'Загрузка...'}
                            disabled={!machinesCatalog}
                            value={formData.machine}
                            type='machine'
                            onChange={handleInputChange}
                            choices={machinesCatalog ?? []}
                        />
                    </div>
                    <div className='details-form-input as-subtitle'>
                        <Input
                            id='date'
                            name='date'
                            label='Дата проведения:'
                            value={formData.date}
                            type='date'
                            onChange={handleInputChange}
                            error={formErrors.date}
                        />
                    </div>
                </>
                :
                <>
                    <h2 className='details-subtitle'>Заводской номер машины: {maintenance.machine.serial_number}</h2>
                    <h2 className='details-subtitle'>Дата проведения: {formatDate(maintenance.date)}</h2>
                </>
            }
            <div className='details-content'>
                <div className='details-content-block'>
                    <h3 className='details-heading'>Вид ТО</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className='details-form-input'>
                                <Select
                                    id='type'
                                    name='type'
                                    label='Название:'
                                    defaultOptionLabel={catalog ? null : 'Загрузка...'}
                                    disabled={!catalog}
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    choices={catalog ?? []}
                                />
                            </div>
                            <div className='details-form-input'>
                                <Input
                                    id='production'
                                    name='production'
                                    label='Наработка м/час:'
                                    placeholder='1 - 5 цифр'
                                    value={formData.production}
                                    type='text'
                                    error={formErrors.production}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span className='bold'>Название:</span> {maintenance.type.name}</p>
                            <p className='details-text'><span className='bold'>Наработка:</span> {maintenance.production} м/час</p>
                        </>
                    }
                    <p className='details-text'><span className='bold'>Описание:</span> <span>{maintenance.type.description}</span></p>
                </div>
                <div className='details-content-block'>
                    <h3 className='details-heading'>Сервисная организация</h3>
                    {
                        (isEditing && role === MANAGER)
                        ?
                        <>
                            <div className='details-form-input'>
                                <Select
                                    id='maintenance_carry_out'
                                    name='maintenance_carry_out'
                                    label='Организация, проводившая ТО:'
                                    defaultOptionLabel={usersCatalog ? 'Самостоятельно' : 'Загрузка...'}
                                    disabled={!usersCatalog}
                                    type='user'
                                    value={formData.maintenance_carry_out}
                                    onChange={handleInputChange}
                                    choices={usersCatalog ?? []}
                                />
                            </div>
                            <div className='details-form-input'>
                                <Select
                                    id='service_company'
                                    name='service_company'
                                    label='Сервисная компания:'
                                    defaultOptionLabel={usersCatalog ? null : 'Загрузка...'}
                                    disabled={!usersCatalog}
                                    type='user'
                                    value={formData.service_company}
                                    onChange={handleInputChange}
                                    choices={usersCatalog ?? []}
                                    error={formErrors.service_company}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'>
                                <span className='bold'>
                                    Организация, проводившя ТО:
                                </span> <span style={{whiteSpace: 'nowrap'}}>
                                    {maintenance.maintenance_carry_out?.org_name ?? "Самостоятельно"}
                                </span>
                            </p>
                            <p className='details-text'>
                                <span className='bold'>
                                    Сервисная компания:
                                </span> <span style={{whiteSpace: 'nowrap'}}>
                                    {maintenance.service_company.org_name}
                                </span>
                            </p>
                        </>
                    }
                </div>
                <div className='details-content-block'>
                    <h3 className='details-heading'>Заказ-наряд</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className='details-form-input'>
                                <Input
                                    id='work_order_number'
                                    name='work_order_number'
                                    label='Номер заказ-наряда:'
                                    placeholder='#0000-000000000'
                                    value={formData.work_order_number}
                                    type='text'
                                    error={formErrors.work_order_number}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='details-form-input'>
                                <Input
                                    id='work_order_date'
                                    name='work_order_date'
                                    label='Дата заказ-наряда:'
                                    value={formData.work_order_date}
                                    type='date'
                                    onChange={handleInputChange}
                                    error={formErrors.work_order_date}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span className='bold'>Номер:</span> {maintenance.work_order_number}</p>
                            <p className='details-text'><span className='bold'>Дата:</span> {formatDate(maintenance.work_order_date)}</p>
                        </>
                    }
                </div>
            </div>
            {
                canEdit
                ?
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
                :
                <p className='edit-tip'>
                    Вы не можете редактировать ТО,<br />которое проводили не Вы
                </p>
            }
        </>
    )
}

export default MaintenanceDetails