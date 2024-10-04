import { UnauthenticatedHomePage, AuthenticatedHomePage } from '..'
import { useAuth } from '../../context'

const HomePage = () => {
    const isAuthenticated = !!useAuth()

    return (
        <>
            {
                isAuthenticated
                ?
                <AuthenticatedHomePage />
                :
                <UnauthenticatedHomePage />
            }
        </>
    )
}

export default HomePage