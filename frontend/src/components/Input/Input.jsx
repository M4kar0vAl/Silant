import './Input.css'

const Input = ({ id, name, label, value=null, placeholder, error, type, onChange }) => {
    return (
        <>
            {
                label
                &&
                <label htmlFor={id}>
                    {label}
                </label>
            }
            <input
                className={error ? 'error' : ''}
                type={type}
                id={id}
                name={name}
                value={value ?? ''}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    )
}

export default Input