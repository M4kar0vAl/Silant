import { Input, Select } from '..'
import { FAILURE_NODE, MANAGER, RECOVERY_METHOD, SERVICE } from '../../constants'
import { useUserData } from '../../context'
import { useEditing, useReclamationForm } from '../../hooks'
import { addLineBreak, formatDate, getDowntime } from '../../utils'

import './ReclamationDetails.css'

const ReclamationDetails = ({ reclamation }) => {
    const role = useUserData().role

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
    } = useReclamationForm(reclamation)
    
    const {
        isEditing,
        handleSaveClick,
        handleDissmissClick
    } = useEditing('reclamation', reclamation, setFormData, setFormErrors, handleSubmit)

    return (
        <>
            <h1 className='details-title'>Рекламация</h1>
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
                </>
                :
                <>
                    <h2 className='details-subtitle'>Заводской номер машины: {reclamation.machine.serial_number}</h2>            
                </>
            }
            <div className='details-content'>
                <div className='details-content-block'>
                    <h3 className='details-heading'>Информация об отказе</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className='details-form-input'>
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
                            <div className='details-form-input'>
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
                        </>
                        :
                        <>
                            <p className='details-text'><span className='bold'>Дата отказа:</span> {formatDate(reclamation.failure_date)}</p>
                            <p className='details-text'><span className='bold'>Описание отказа:</span> {reclamation.failure_description}</p>
                        </>
                    }
                </div>
                <div className='details-content-block'>
                    <h3 className='details-heading'>Узел отказа</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className='details-form-input'>
                                <Select
                                    id='failure_node'
                                    name='failure_node'
                                    label='Название:'
                                    defaultOptionLabel={catalog ? null : 'Загрузка...'}
                                    disabled={!catalog}
                                    value={formData.failure_node}
                                    onChange={handleInputChange}
                                    choices={catalog?.filter((obj) => obj.entity === FAILURE_NODE) ?? []}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span className='bold'>Название:</span> {reclamation.failure_node.name}</p>
                        </>
                    }
                    <p className='details-text'><span className='bold'>Описание:</span> <span>{reclamation.failure_node.description}</span></p>
                </div>
                <div className='details-content-block'>
                    <h3 className='details-heading'>Информация о восстановлении</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className='details-form-input'>
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
                            <div className='details-form-input'>
                                <Select
                                    id='recovery_method'
                                    name='recovery_method'
                                    label='Метод восстановления:'
                                    defaultOptionLabel={catalog ? null : 'Загрузка...'}
                                    disabled={!catalog}
                                    value={formData.recovery_method}
                                    onChange={handleInputChange}
                                    choices={catalog?.filter((obj) => obj.entity === RECOVERY_METHOD) ?? []}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span className='bold'>Дата восстановления:</span> {formatDate(reclamation.recovery_date)}</p>
                            <p className='details-text'><span className='bold'>Метод восстановления:</span> {reclamation.recovery_method.name}</p>
                        </>
                    }
                    <p className='details-text'><span className='bold'>Описание метода:</span> <span>{reclamation.recovery_method.description}</span></p>
                    {
                        isEditing
                        ?
                            <p className='details-text'>
                                <span className='bold'>
                                    Время простоя (в днях):
                                </span> {getDowntime(formData.failure_date, formData.recovery_date)}
                            </p>
                        :
                        <>
                            <p className='details-text'><span className='bold'>Время простоя (в днях):</span> {reclamation.downtime}</p>
                        </>
                    }
                </div>
                <div className='details-content-block'>
                    <h3 className='details-heading'>Запасные части</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className='details-form-input'>
                                <Input
                                    id='spare_parts'
                                    name='spare_parts'
                                    type='text'
                                    placeholder='&le; 256 символов (; для разделения)'
                                    value={formData.spare_parts}
                                    onChange={handleInputChange}
                                    error={formErrors.spare_parts}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'>{
                                reclamation.spare_parts
                                ?
                                addLineBreak(reclamation.spare_parts)
                                :
                                'Нет'
                            }</p>
                        </>
                    }
                </div>
                <div className='details-content-block'>
                    <h3 className='details-heading'>Сервисная компания</h3>
                    {
                        isEditing && role === MANAGER
                        ?
                        <>
                            <div className='details-form-input'>
                                <Select
                                    id='service_company'
                                    name='service_company'
                                    defaultOptionLabel={usersCatalog ? null : 'Загрузка...'}
                                    disabled={!usersCatalog}
                                    type='user'
                                    value={formData.service_company}
                                    onChange={handleInputChange}
                                    choices={usersCatalog ?? []}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span style={{whiteSpace: 'nowrap'}}>{reclamation.service_company.org_name}</span></p>
                        </>
                    }
                </div>
                <div className='details-content-block'>
                    <h3 className='details-heading'>Наработка (м/час)</h3>
                    {
                        isEditing
                        ?
                        <>
                            <div className='details-form-input'>
                                <Input
                                    id='production'
                                    name='production'
                                    type='text'
                                    placeholder='1 - 5 цифр'
                                    value={formData.production}
                                    onChange={handleInputChange}
                                    error={formErrors.production}
                                />
                            </div>
                        </>
                        :
                        <>
                            <p className='details-text'><span style={{whiteSpace: 'nowrap'}}>{reclamation.production}</span></p>
                        </>
                    }
                </div>
            </div>
            {
                (role === MANAGER || role === SERVICE)
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

export default ReclamationDetails