import { Input, Select } from '..'
import { MANAGER } from '../../constants'
import { useUserData } from '../../context'
import { useMaintenanceForm } from '../../hooks'

import './MaintenanceCreate.css'

const MaintenanceCreate = () => {
    const role = useUserData().role

    const {
        formData,
        formErrors,
        handleInputChange,
        handleSubmit,
        isDisabled,
        isPending,
        catalog,
        usersCatalog,
        machinesCatalog
    } = useMaintenanceForm()

    return (
        <>
            <h1 className='create-title'>Добавить ТО</h1>
            <form className='create-maintenance-form' onSubmit={handleSubmit}>
                <div className='create-required-fields'>
                    <div className='create-form-input'>
                        <Select
                            id='type'
                            name='type'
                            label='Вид ТО:'
                            defaultOptionLabel={catalog ? null : 'Загрузка...'}
                            disabled={!catalog}
                            value={formData.type}
                            onChange={handleInputChange}
                            choices={catalog ?? []}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Input
                            id='date'
                            name='date'
                            label='Дата проведения ТО'
                            value={formData.date}
                            type='date'
                            onChange={handleInputChange}
                            error={formErrors.date}
                        />
                    </div>
                    <div className='create-form-input'>
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
                    <div className='create-form-input'>
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
                    <div className='create-form-input'>
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
                    {
                        role === MANAGER
                        &&
                        <div className='create-form-input'>
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
                    }
                    <div className='create-form-input'>
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
                    {
                        role === MANAGER
                        &&
                        <div className='create-form-input'>
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
                            />
                        </div>
                    }
                </div>
                <p className='create-form-tip'><span style={{color: '#D20A11'}}>*</span> - обязательное поле</p>
                <button type='submit' disabled={isDisabled || isPending}>Добавить</button>
            </form>
        </>
    )
}

export default MaintenanceCreate