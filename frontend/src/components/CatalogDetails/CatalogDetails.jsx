import { Input, Select } from '..'
import { ENTITY_CHOICES, MANAGER } from '../../constants'
import { useUserData } from '../../context'
import { useCatalogForm, useEditing } from '../../hooks'

import './CatalogDetails.css'

const CatalogDetails = ({ catalog }) => {
    const role = useUserData().role

    const {
        formData,
        formErrors,
        setFormData,
        setFormErrors,
        handleInputChange,
        handleSubmit,
        isDisabled,
        isPending
    } = useCatalogForm(catalog)

    const {
        isEditing,
        handleSaveClick,
        handleDissmissClick
    } = useEditing('catalog', catalog, setFormData, setFormErrors, handleSubmit)

    return (
        <>
            {
                isEditing
                    ?
                    <>
                        <div className='details-form-input as-title'>
                            <Input
                                id='name'
                                name='name'
                                label='Название:'
                                placeholder='&le; 128 символов'
                                type='text'
                                value={formData.name}
                                onChange={handleInputChange}
                                error={formErrors.name}
                            />
                        </div>
                        <div className='details-form-input as-subtitle'>
                            <Select
                                id='entity'
                                name='entity'
                                label='Объект:'
                                type='entity'
                                value={formData.entity}
                                onChange={handleInputChange}
                                choices={Object.entries(ENTITY_CHOICES).map(([selectValue, selectName]) => ({ name: selectName, value: selectValue }))}
                                error={formErrors.entity}
                            />
                        </div>
                        <div className='details-form-input'>
                            <label htmlFor="description">
                                Описание:
                            </label>
                            <textarea
                                className={formErrors.description ? 'error' : ''}
                                name="description"
                                id="description"
                                placeholder='&le; 256 символов'
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                    :
                    <>
                        <h1 className='details-title'>{catalog.name}</h1>
                        <h2 className='details-subtitle catalog'>{ENTITY_CHOICES[catalog.entity]}</h2>
                        <p className='details-catalog-description'>{catalog.description}</p>
                    </>
            }
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

export default CatalogDetails