import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthDispatch, useShortMachineDataDispatch, useUserDataDispatch } from '../../context'
import { LOGIN_URL, USER_INFO_URL } from '../../constants'

import './AuthPage.css'

const AuthPage = () => {
    const [isPending, setIsPending] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState({
        username: '',
        password: '',
        nonFieldErrors: ''
    })

    const dispatch = useAuthDispatch()
    const machineDispatch = useShortMachineDataDispatch()
    const userDataDispatch = useUserDataDispatch()
    const navigate = useNavigate()
    
    const isDisabled = formErrors.username || formErrors.password

    function handleInputChange(e) {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        switch (name) {
            case 'login':
                if (!isUsernameValid(value)) {
                    setFormErrors({
                        ...formErrors,
                        username: 'Не больше 150 символов. Буквы, цифры и @ . + - _'
                    })
                } else {
                    setFormErrors({
                        ...formErrors,
                        username: ''
                    })
                }
                break;
            case 'password':
                if (!value) {
                    setFormErrors({
                        ...formErrors,
                        password: 'Обязательное поле'
                    })
                } else {
                    setFormErrors({
                        ...formErrors,
                        password: ''
                    })
                }
                break;
        }
    }
    
    async function handleSubmit(e) {
        e.preventDefault()

        setIsPending(true)

        let token
        try {
            const resp = await axios.post(LOGIN_URL, formData)
            token = resp.data.token
            dispatch({
                type: 'setToken',
                token: token
            })
            machineDispatch({
                type: 'clearMachine'
            })
            setFormErrors({
                ...formErrors,
                nonFieldErrors: ''
            })
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setFormErrors({
                        ...formErrors,
                        nonFieldErrors: 'Неверные имя пользователя и/или пароль'
                    })
                }
            } else {
                console.error(error)
            }
        }

        try {
            const resp = await axios.get(USER_INFO_URL, {headers: {'Authorization': `Token ${token}`}})

            userDataDispatch({
                type: 'setUserData',
                userData: resp.data
            })
        } catch (error) {
            console.error(error)
        }
        navigate('/', {replace: true})
        setIsPending(false)
    }

    return (
        <div className="auth-container">
            <h1 className='auth-title'>Авторизация</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="username">Логин: </label>
                    <input
                        className={formErrors.username ? 'error' : ''}
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleInputChange}
                    />
                    {
                        formErrors.username
                        &&
                        <p className='error'>{formErrors.username}</p>
                    }
                </div>
                <div className="input-container">
                    <label htmlFor="password">Пароль: </label>
                    <input
                        className={formErrors.password ? 'error' : ''}
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleInputChange}
                    />
                    {
                        formErrors.password
                        &&
                        <p className='error'>{formErrors.password}</p>
                    }
                </div>
                {
                    formErrors.nonFieldErrors
                    &&
                    <p className='error'>{formErrors.nonFieldErrors}</p>
                }
                <button type="submit" disabled={isDisabled || isPending}>Войти</button>
            </form>
        </div>
    )
}

function isUsernameValid(login) {
    let regexp = /^[A-Za-z0-9@_\.\+\-]{1,150}$/
    return regexp.test(login)
}

export default AuthPage