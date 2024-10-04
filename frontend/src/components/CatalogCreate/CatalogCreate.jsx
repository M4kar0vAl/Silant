import { Input, Select } from '..'
import { ENTITY_CHOICES } from '../../constants'
import { useCatalogForm } from '../../hooks'

import './CatalogCreate.css'

const CatalogCreate = () => {
    const {
        formData,
        formErrors,
        isDisabled,
        isPending,
        handleInputChange,
        handleSubmit
    } = useCatalogForm()

    return (
        <>
            <h1 className='create-catalog-title'>Добавить объект в справочник</h1>
            <form className='create-catalog-form' onSubmit={handleSubmit}>
                <div className='create-catalog-input'>
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
                <div className='create-catalog-input'>
                    <Select
                        id='entity'
                        name='entity'
                        label='Объект:'
                        type='entity'
                        value={formData.entity}
                        onChange={handleInputChange}
                        choices={Object.entries(ENTITY_CHOICES).map(([selectValue, selectName]) => ({name: selectName, value: selectValue}))}
                        error={formErrors.entity}
                    />
                </div>
                <div className='create-catalog-input'>
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
                        rows='10'
                    />
                </div>
                <p className='tip'><span>*</span> - обязательное поле</p>
                <button type='submit' disabled={isDisabled || isPending}>Добавить</button>
            </form>
        </>
    )
}

export default CatalogCreate