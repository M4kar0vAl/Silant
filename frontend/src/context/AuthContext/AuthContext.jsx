import axios from "axios";
import { createContext, useContext, useReducer } from "react";

const authContext = createContext(null)
const authDispatchContext = createContext(null)

export function useAuth() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }

    return useContext(authContext)
}

export function useAuthDispatch() {
    return useContext(authDispatchContext)
}

export function AuthProvider({ children }) {
    const [token, dispatch] = useReducer(authReducer, JSON.parse(localStorage.getItem('token')))

    return (
        <authContext.Provider value={token}>
            <authDispatchContext.Provider value={dispatch}>
                {children}
            </authDispatchContext.Provider>
        </authContext.Provider>
    )
}

function authReducer(state, action) {
    const {type, token} = action

    switch (type) {
        case 'setToken':
            localStorage.setItem('token', JSON.stringify(token))
            axios.defaults.headers.common["Authorization"] = 'Token ' + token
            return token
        case 'clearToken':
            localStorage.removeItem('token')
            delete axios.defaults.headers.common["Authorization"]
            return null
    }
    throw Error(`Unknown action type: ${type}`);
}
