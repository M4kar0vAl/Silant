import { createContext, useContext, useReducer } from "react";

const shortMachineDataContext = createContext(null)
const shortMachineDataDispatchContext = createContext(null)

export function useShortMachineData() {
    return useContext(shortMachineDataContext)
}

export function useShortMachineDataDispatch() {
    return useContext(shortMachineDataDispatchContext)
}

export function ShortMachineDataProvider({ children }) {
    const [machine, dispatch] = useReducer(shortMachineDataReducer, JSON.parse(localStorage.getItem('machine')))

    return (
        <shortMachineDataContext.Provider value={machine}>
            <shortMachineDataDispatchContext.Provider value={dispatch}>
                {children}
            </shortMachineDataDispatchContext.Provider>
        </shortMachineDataContext.Provider>
    )
}

function shortMachineDataReducer(state, action) {
    const { type, machine, notFound } = action
    let nextState // {machine: {}, notFound: false}
    
    switch (type) {
        case 'setMachine':
            nextState = {
                ...state,
                machine: machine
            }
            localStorage.setItem('machine', JSON.stringify(nextState))
            return nextState
        case 'clearMachine':
            localStorage.removeItem('machine')
            return null
        case 'setNotFound':
            nextState = {
                ...state,
                notFound: notFound
            }
            localStorage.setItem('machine', JSON.stringify(nextState))
            return nextState
    }
    throw Error(`Unknown action type: ${type}`);
}
