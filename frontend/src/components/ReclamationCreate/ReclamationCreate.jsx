import { Input, Select } from '..'
import { FAILURE_NODE, MANAGER, RECOVERY_METHOD } from '../../constants'
import { useUserData } from '../../context'
import { useReclamationForm } from '../../hooks'

import './ReclamationCreate.css'

const ReclamationCreate = () => {
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
    } = useReclamationForm()
    
    return (
        <>
            <h1 className='create-title'>Добавить рекламацию</h1>
            <form className='create-reclamation-form' onSubmit={handleSubmit}>
                <div className='create-required-fields'>
                    <div className='create-form-input'>
                        <Input
                            id='failure_date'
                            name='failure_date'
                            label='Дата отказа:'
                            type='date'
                            value={formData.failure_date}
                            onChange={handleInputChange}
                            error={formErrors.failure_date}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Input
                            id='production'
                            name='production'
                            label='Наработка м/час:'
                            type='text'
                            placeholder='1 - 5 цифр'
                            value={formData.production}
                            onChange={handleInputChange}
                            error={formErrors.production}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Select
                            id='failure_node'
                            name='failure_node'
                            label='Узел отказа:'
                            defaultOptionLabel={catalog ? null : 'Загрузка...'}
                            disabled={!catalog}
                            value={formData.failure_node}
                            onChange={handleInputChange}
                            choices={catalog?.filter((obj) => obj.entity === FAILURE_NODE) ?? []}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Input
                            id='failure_description'
                            name='failure_description'
                            label='Описание отказа:'
                            type='text'
                            placeholder='Не больше 256 символов'
                            value={formData.failure_description}
                            onChange={handleInputChange}
                            error={formErrors.failure_description}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Select
                            id='recovery_method'
                            name='recovery_method'
                            label='Способ восстановления:'
                            defaultOptionLabel={catalog ? null : 'Загрузка...'}
                            disabled={!catalog}
                            value={formData.recovery_method}
                            onChange={handleInputChange}
                            choices={catalog?.filter((obj) => obj.entity === RECOVERY_METHOD) ?? []}
                        />
                    </div>
                    <div className='create-form-input'>
                        <Input
                            id='recovery_date'
                            name='recovery_date'
                            label='Дата восстановления:'
                            type='date'
                            value={formData.recovery_date}
                            onChange={handleInputChange}
                            error={formErrors.recovery_date}
                        />
                    </div>
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
                <div className='create-unrequired-fields'>
                    <div className='create-form-input'>
                        <Input
                            id='spare_parts'
                            name='spare_parts'
                            label='Запасные части:'
                            type='text'
                            placeholder='&le; 256 символов (; для разделения)'
                            value={formData.spare_parts}
                            onChange={handleInputChange}
                            error={formErrors.spare_parts}
                        />
                    </div>
                </div>
                <p className='create-form-tip'><span style={{ color: '#D20A11' }}>*</span> - обязательное поле</p>
                <button type='submit' disabled={isDisabled || isPending}>Добавить</button>
            </form>
        </>
    )
}

export default ReclamationCreate