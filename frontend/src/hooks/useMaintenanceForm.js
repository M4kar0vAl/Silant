import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { MAINTENANCE_TYPE, MAINTENANCE_URL, MANAGER, SERVICE } from "../constants"
import { useUserData } from "../context"
import { useCatalog, useUsersCatalog, useMachinesCatalog } from '../hooks'
import { isMaintenanceDateValid, isProductionValid, isWorkOrderDateValid, isWorkOrderNumberValid } from "../utils"

export function useMaintenanceForm(maintenance=null) {
    const role = useUserData().role

    const catalog = useCatalog([
        MAINTENANCE_TYPE
    ])

    const usersCatalog = useUsersCatalog([
        SERVICE
    ])
    
    const machinesCatalog = useMachinesCatalog()

    const [isPending, setIsPending] = useState(false)
    
    const [formData, setFormData] = useState(
        maintenance
        ?
        // editing
        {
            type: maintenance.type.id,
            date: maintenance.date,
            production: maintenance.production,
            work_order_number: maintenance.work_order_number,
            work_order_date: maintenance.work_order_date,
            maintenance_carry_out: maintenance.maintenance_carry_out?.id ?? null,
            machine: maintenance.machine.id,
            service_company: maintenance.service_company.id
        }
        :
        // creating
        {
            type: '',
            date: '',
            production: '',
            work_order_number: '',
            work_order_date: '',
            maintenance_carry_out: '',
            machine: '',
            service_company: ''
        }
    )
    
    const [formErrors, setFormErrors] = useState({
        date: false,
        production: false,
        work_order_number: false,
        work_order_date: false,
        service_company: false
    })
    
    let isDisabled = true
    isDisabled = Object.values(formErrors).some((value) => value)

    if (!isDisabled) {
        isDisabled = !Object.entries(formData).every(([key, value]) => {
            // every value must return true, button will be disabled otherwise
            if (key === 'service_company') {
                // this key required for manager only
                if (role === MANAGER) {
                    return value
                } else {
                    return true
                }
            } else if (key === 'maintenance_carry_out') {
                // this key can have an empty string value
                // if so, then maintenance was carried out by client himself
                return true
            } else {
                return value
            }
        })
    }

    const navigate = useNavigate()

    function handleInputChange(e) {
        const {name, value} = e.target
        
        setFormData({
            ...formData,
            [name]: value
        })

        if (name === 'date') {
            if (!isMaintenanceDateValid(value)) {
                setFormErrors({
                    ...formErrors,
                    date: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    date: false
                })
            }
        } else if (name === 'production') {
            if (!isProductionValid(value)) {
                setFormErrors({
                    ...formErrors,
                    production: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    production: false
                })
            }
        } else if (name === 'work_order_number') {
            if (!isWorkOrderNumberValid(value)) {
                setFormErrors({
                    ...formErrors,
                    work_order_number: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    work_order_number: false
                })
            }
        } else if (name === 'work_order_date') {
            if (!isWorkOrderDateValid(value)) {
                setFormErrors({
                    ...formErrors,
                    work_order_date: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    work_order_date: false
                })
            }
        } else if (name === 'service_company') {
            if (!value) {
                setFormErrors({
                    ...formErrors,
                    service_company: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    service_company: false
                })
            }
        }
    }
    
    async function handleSubmit(e) {
        e.preventDefault()

        setIsPending(true)

        let requestData = formData

        if (!formData.maintenance_carry_out) {
            requestData = {
                ...requestData,
                maintenance_carry_out: null
            }
        }

        try {
            let resp
            if (maintenance) {
                // editing
                resp = await axios.patch(`${MAINTENANCE_URL}${maintenance.id}/`, requestData)
            } else {
                // creating
                resp = await axios.post(MAINTENANCE_URL, requestData)
            }
            const maintenanceResponseData = resp.data
            navigate(`/maintenance/${maintenanceResponseData.id}`, {
                state: {
                    maintenance: {
                        ...maintenanceResponseData,
                        type: catalog.find((type) => type.id === maintenanceResponseData.type),
                        maintenance_carry_out: usersCatalog.find(
                            (carry_out) => carry_out.id === maintenanceResponseData.maintenance_carry_out
                        ) ?? maintenanceResponseData.maintenance_carry_out,
                        machine: machinesCatalog.find((machine) => machine.id === maintenanceResponseData.machine),
                        service_company: usersCatalog.find((service_company) => service_company.id === maintenanceResponseData.service_company)
                    }
                },
                replace: true
            })
        } catch (error) {
            console.error(error)
        }
        setIsPending(false)
    }

    return {
        formData,
        setFormData,
        formErrors,
        setFormErrors,
        handleInputChange,
        handleSubmit,
        isDisabled,
        isPending,
        catalog,
        usersCatalog,
        machinesCatalog
    }
}