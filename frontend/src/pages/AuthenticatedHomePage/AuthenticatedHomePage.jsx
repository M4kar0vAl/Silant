import { Loader, SearchResult } from "../../components"
import { useUserData } from "../../context"
import { MANAGER, SERVICE, CLIENT } from "../../constants"

import './AuthenticatedHomePage.css'

const AuthenticatedHomePage = () => {
    const userData = useUserData()

    let userRole
    switch (userData?.role) {
        case CLIENT:
            userRole = 'Клиент'
            break;
        case SERVICE:
            userRole = 'Сервисная компания'
            break;
        case MANAGER:
            userRole = 'Менеджер'
            break;
    }

    return (
        <div className="auth-home-container">
            <div className="auth-user-info">
                {
                    userData
                    ?
                    <>
                        <h1 className="auth-home-title">{userData.org_name ? userData.org_name : userData.username}</h1>
                        <p className="auth-home-role">{userRole}</p>
                    </>
                    :
                    <Loader light={true} />
                }
            </div>
            <SearchResult />
        </div>
    )
}

export default AuthenticatedHomePage