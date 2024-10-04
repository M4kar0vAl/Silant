import './Select.css'

const Select = ({ id, name, label, value=null, onChange, choices, type='catalog', defaultOptionLabel=null, error, disabled=false }) => {
    let nameField
    let valueField
    switch (type) {
        case 'catalog':
            nameField = 'name'
            valueField = 'id'
            break;
        case 'user':
            nameField = 'org_name'
            valueField = 'id'
            break;
        case 'machine':
            nameField = 'serial_number'
            valueField = 'id'
            break;
        case 'entity':
            nameField = 'name'
            valueField = 'value'
            break;
        case 'sort':
            nameField = 'name'
            valueField = 'value'
            break;
    }
    
    return (
        <>
            {
                label
                &&
                <label htmlFor={id}>
                    {label}
                </label>
            }
            <select
                className={error ? 'error' : ''}
                name={name}
                id={id}
                onChange={onChange}
                value={value ?? ''}
                disabled={disabled}
            >
                {
                    <option value=''>{defaultOptionLabel ?? 'Выберите один из вариантов'}</option>
                }
                {choices.map((obj) => (
                    <option key={obj[valueField]} value={obj[valueField]}>{obj[nameField]}</option>
                ))}
            </select>
        </>
    )
}

export default Select