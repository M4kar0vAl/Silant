import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { FAILURE_NODE, MANAGER, RECLAMATION_URL, RECOVERY_METHOD, SERVICE } from "../constants"
import { useCatalog, useUsersCatalog, useMachinesCatalog } from "../hooks"
import { isFailureDateValid, isFailureDescriptionValid, isProductionValid, isRecoveryDateValid, isSparePartsValid } from "../utils"
import { useUserData } from "../context"

export function useReclamationForm(reclamation=null) {
    const role = useUserData().role
    const navigate = useNavigate()

    const catalog = useCatalog([
        FAILURE_NODE,
        RECOVERY_METHOD
    ])
    
    const usersCatalog = useUsersCatalog([
        SERVICE
    ])

    const machinesCatalog = useMachinesCatalog()

    const [isPending, setIsPending] = useState(false)

    const [formData, setFormData] = useState(
        reclamation
        ?
        // editing
        {
            failure_date: reclamation.failure_date,
            production: reclamation.production,
            failure_node: reclamation.failure_node.id,
            failure_description: reclamation.failure_description,
            recovery_method: reclamation.recovery_method.id,
            spare_parts: reclamation.spare_parts,
            recovery_date: reclamation.recovery_date,
            machine: reclamation.machine.id,
            service_company: reclamation.service_company.id
        }
        :
        // creating
        {
            failure_date: '',
            production: '',
            failure_node: '',
            failure_description: '',
            recovery_method: '',
            spare_parts: '',
            recovery_date: '',
            machine: '',
            service_company: ''
        }
    )
    
    const [formErrors, setFormErrors] = useState({
        failure_date: false,
        production: false,
        failure_description: false,
        spare_parts: false,
        recovery_date: false,
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
            } else if (key === 'spare_parts') {
                return true
            } else {
                return value
            }
        })
    }

    function handleInputChange(e) {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })

        if (name === 'failure_date') {
            let nextformErrors = formErrors
            // check if failure date valid and update next state's value
            if (!isFailureDateValid(value)) {
                nextformErrors = {
                    ...nextformErrors,
                    failure_date: true
                }
            } else {
                nextformErrors = {
                    ...nextformErrors,
                    failure_date: false
                }
            }

            // if recovery date is not set, then set error state and return
            if (!formData.recovery_date) {
                setFormErrors(nextformErrors)
                return
            }

            // if recovery date is set, then check if it is valid with current failure date and update next state's value
            if (!isRecoveryDateValid(formData.recovery_date, value)) {
                nextformErrors = {
                    ...nextformErrors,
                    recovery_date: true
                }
            } else {
                nextformErrors = {
                    ...nextformErrors,
                    recovery_date: false
                }
            }

            // set error state after all checks
            setFormErrors(nextformErrors)
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
        } else if (name === 'failure_description') {
            if (!isFailureDescriptionValid(value)) {
                setFormErrors({
                    ...formErrors,
                    failure_description: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    failure_description: false
                })
            }
        } else if (name === 'spare_parts') {
            if (!isSparePartsValid(value)) {
                setFormErrors({
                    ...formErrors,
                    spare_parts: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    spare_parts: false
                })
            }
        } else if (name === 'recovery_date') {
            if (!formData.failure_date) {
                // nothing to comapre
                return
            }

            if (!isRecoveryDateValid(value, formData.failure_date)) {
                setFormErrors({
                    ...formErrors,
                    recovery_date: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    recovery_date: false
                })
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setIsPending(true)

        try {
            let resp
            if (reclamation) {
                resp = await axios.patch(`${RECLAMATION_URL}${reclamation.id}/`, formData)
            } else {
                resp = await axios.post(RECLAMATION_URL, formData)
            }
            const reclamationResponseData = resp.data
            navigate(`/reclamation/${reclamationResponseData.id}`, {
                state: {
                    reclamation: {
                        ...reclamationResponseData,
                        failure_node: catalog.find((node) => node.id === reclamationResponseData.failure_node),
                        recovery_method: catalog.find((method) => method.id === reclamationResponseData.recovery_method),
                        machine: machinesCatalog.find((machine) => machine.id === reclamationResponseData.machine),
                        service_company: usersCatalog.find((user) => user.id === reclamationResponseData.service_company)
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