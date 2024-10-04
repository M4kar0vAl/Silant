import axios from 'axios'
import { useState } from 'react'

import { SearchResult } from '../../components'
import { BASE_URL } from '../../constants'
import { useShortMachineData, useShortMachineDataDispatch } from '../../context'
import { isSerialNumberValid } from '../../utils'

import './UnauthenticatedHomePage.css'

const UnauthenticatedHomePage = () => {
    const [serialNumber, setSerialNumber] = useState('')
    const [hasError, setHasError] = useState(false)
    const machineData = useShortMachineData()
    const dispatch = useShortMachineDataDispatch()

    let machine, notFound
    if (machineData) {
        const {machine: machine_, notFound: notFound_} = machineData
        machine = machine_
        notFound = notFound_
    }

    // disabled if has error or field is empty or is pending
    const isDisabled = hasError || !serialNumber || (machine === null && !notFound)

    function handleInputChange(e) {
        const value = e.target.value
        setSerialNumber(value)
        if (!isSerialNumberValid(value)) {
            setHasError(true)
        } else {
            setHasError(false)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        
        dispatch({
            type: 'setMachine',
            machine: null
        })
        dispatch({
            type: 'setNotFound',
            notFound: false
        })
        const Url = `${BASE_URL}/machine/${serialNumber}/`

        try {
            const resp = await axios.get(Url)
            dispatch({
                type: 'setMachine',
                machine: resp.data,
            })
            dispatch({
                type: 'setNotFound',
                notFound: false
            })
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    dispatch({
                        type: 'setMachine',
                        machine: null
                    })
                    dispatch({
                        type: 'setNotFound',
                        notFound: true
                    })
                }
            } else {
                console.error(error)
            }
        }
    }

    return (
        <div className='unauth-container'>
            <h1 className='unauth-title'>
                Проверьте комплектацию и технические характеристики <span style={{'whiteSpace': 'nowrap'}}>техники Силант</span>
            </h1>
            <section className='unauth-search-section'>
                <form className='unauth-form' onSubmit={handleSubmit}>
                    <label htmlFor="serial_number">Заводской номер: </label>
                    <input
                        className={hasError ? 'error' : ''}
                        type="text"
                        name="serial_number"
                        id="serial_number"
                        placeholder='4 - 10 цифр'
                        onChange={handleInputChange} />
                    <button type='submit' disabled={isDisabled}>Поиск</button>
                </form>
                <SearchResult />
            </section>
        </div>
    )
}

export default UnauthenticatedHomePage