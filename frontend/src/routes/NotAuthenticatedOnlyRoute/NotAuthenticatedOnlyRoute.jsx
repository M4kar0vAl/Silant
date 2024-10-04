import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context"

const NotAuthenticatedOnlyRoute = () => {
    const isAuthenticated = !!useAuth()

    if (isAuthenticated) {
        return <Navigate to={'/'} replace={true}/>
    }
    
    return (
        <Outlet />
    )
}

export default NotAuthenticatedOnlyRoute