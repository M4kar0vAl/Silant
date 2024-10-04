import { createContext, useContext, useReducer } from "react";

const userDataContext = createContext(null)
const userDataDispatchContext = createContext(null)

export function useUserData() {
    return useContext(userDataContext)
}

export function useUserDataDispatch() {
    return useContext(userDataDispatchContext)
}

export function UserDataProvider({ children }) {
    const [userData, dispatch] = useReducer(userDataReducer, JSON.parse(localStorage.getItem('userData')))

    return (
        <userDataContext.Provider value={userData}>
            <userDataDispatchContext.Provider value={dispatch}>
                {children}
            </userDataDispatchContext.Provider>
        </userDataContext.Provider>
    )
}

function userDataReducer(state, action) {
    const {type, userData} = action

    switch (type) {
        case 'setUserData':
            localStorage.setItem('userData', JSON.stringify(userData))
            return userData
    
        case 'clearUserData':
            localStorage.removeItem('userData')
            return null
    }
    throw Error(`Unknown action type: ${type}`)
}