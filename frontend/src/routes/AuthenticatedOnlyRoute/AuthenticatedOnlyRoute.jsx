import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../../context"

const AuthenticatedOnlyRoute = () => {
    const isAuthenticated = !!useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace={true} />
    }

    return (
        <Outlet />
    )
}

export default AuthenticatedOnlyRoute