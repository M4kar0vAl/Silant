import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth, useAuthDispatch, useCatalogDataDispatch, useTableDataDispatch, useUserDataDispatch } from '../../context'
import { LOGOUT_URL } from '../../constants'

import logoUrl from '/src/assets/logos/logo_2_blue.svg'
import telegramUrl from '/src/assets/social_media/telegram.svg'

import './Header.css'

const Header = () => {
    const isAuthenticated = !!useAuth()
    const dispatch = useAuthDispatch()
    const userDataDispatch = useUserDataDispatch()
    const tableDataDispatch = useTableDataDispatch()
    const catalogDataDispatch = useCatalogDataDispatch()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            const resp = await axios.post(LOGOUT_URL)
            
            if (resp.status === 200) {
                dispatch({
                    type: 'clearToken'
                })
                userDataDispatch({
                    type: 'clearUserData'
                })
                tableDataDispatch({
                    type: 'clearTableData'
                })
                catalogDataDispatch({
                    type: 'clearCatalogData'
                })
                navigate('/auth')
            }
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <header className="header">
            <div className='inner-header'>
                <a className='logo-container' href="/">
                    <img className='header-logo' src={logoUrl} alt="logo" />
                </a>
                <p className='header-text'>
                    Электронная сервисная книжка <span>"Мой Силант"</span>
                </p>
                <div className='header-links'>
                    <a href="https://t.me/chzsa21" target='_blank'>
                        <img height='100%' src={telegramUrl} alt="telegram logo" />
                    </a>
                    <a href="tel:+78352204243">+7 (835) 220-42-43</a>
                    {
                        isAuthenticated
                        ?
                        <button className='auth-link' onClick={handleLogout}>Выйти</button>
                        :
                        <Link className='auth-link' to='/auth' >Войти</Link>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
