import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    CLIENT,
    CONTROLLED_BRIDGE_MODEL,
    DRIVE_AXLE_MODEL,
    ENGINE_MODEL,
    EQUIPMENT_MODEL,
    MACHINE_URL,
    SERVICE,
    TRANSMISSION_MODEL
} from "../constants"
import { useCatalog, useUsersCatalog } from '.'
import {
    formatDate,
    isAddressValid,
    isConsigneeValid,
    isContractDateValid,
    isContractNumberValid,
    isEquipmentSerialNumberValid,
    isSerialNumberValid,
    isShipmentDateValid
} from "../utils"

export function useMachineForm(machine=null) {
    const catalog = useCatalog([
        ENGINE_MODEL,
        EQUIPMENT_MODEL,
        TRANSMISSION_MODEL,
        DRIVE_AXLE_MODEL,
        CONTROLLED_BRIDGE_MODEL
    ])

    const usersCatalog = useUsersCatalog([
        CLIENT,
        SERVICE
    ])
    
    const [isPending, setIsPending] = useState(false)
    const [contract, setContract] = useState({
        contractNumber: '',
        contractDate: ''
    })

    const [contractErrors, setContractErrors] = useState({
        contractNumber: false,
        contractDate: false
    })

    const [formData, setFormData] = useState(
        machine
        ?
        // editing
        {
            serial_number: machine.serial_number,
            equipment_model: machine.equipment_model?.id,
            engine_model: machine.engine_model?.id,
            engine_serial_number: machine.engine_serial_number,
            transmission_model: machine.transmission_model?.id,
            transmission_serial_number: machine.transmission_serial_number,
            drive_axle_model: machine.drive_axle_model?.id,
            drive_axle_serial_number: machine.drive_axle_serial_number,
            controlled_bridge_model: machine.controlled_bridge_model?.id,
            controlled_bridge_serial_number: machine.controlled_bridge_serial_number,
            supply_contract_number_date: machine.supply_contract_number_date,
            shipment_date: machine.shipment_date,
            consignee: machine.consignee,
            delivery_address: machine.delivery_address,
            additional_equipment: machine.additional_equipment,
            client: machine.client?.id,
            service_company: machine.service_company?.id
        }
        :
        // creating
        {
            serial_number: '',
            equipment_model: 0,
            engine_model: 0,
            engine_serial_number: '',
            transmission_model: 0,
            transmission_serial_number: '',
            drive_axle_model: 0,
            drive_axle_serial_number: '',
            controlled_bridge_model: 0,
            controlled_bridge_serial_number: '',
            supply_contract_number_date: '',
            shipment_date: null,
            consignee: '',
            delivery_address: '',
            additional_equipment: null,
            client: null,
            service_company: null
        }
    )

    const [formErrors, setFormErrors] = useState({
        serial_number: false,
        engine_serial_number: false,
        transmission_serial_number: false,
        drive_axle_serial_number: false,
        controlled_bridge_serial_number: false,
        shipment_date: false,
        consignee: false,
        delivery_address: false,
        client: false,
        service_company: false
    })

    const navigate = useNavigate()
    const [alreadyExistsError, setAlreadyExistsError] = useState(false)

    let isDisabled = true
    isDisabled = Object.values(formErrors).some((value) => value) || Object.values(contractErrors).some((value) => value) || alreadyExistsError

    if (!isDisabled) {
        isDisabled = !(
            formData.serial_number &&
            formData.equipment_model &&
            formData.engine_model &&
            formData.engine_serial_number &&
            formData.transmission_model &&
            formData.transmission_serial_number &&
            formData.drive_axle_model &&
            formData.drive_axle_serial_number &&
            formData.controlled_bridge_model &&
            formData.controlled_bridge_serial_number
        )
    }

    function handleInputChange(e) {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })

        if ([
            'engine_serial_number',
            'transmission_serial_number',
            'drive_axle_serial_number',
            'controlled_bridge_serial_number'
        ].includes(name)) {
            if (!isEquipmentSerialNumberValid(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: false
                })
            }
        } else if (name === 'serial_number') {
            setAlreadyExistsError(false)
            if (!isSerialNumberValid(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: false
                })
            }
        } else if (name === 'shipment_date') {
            if (!isShipmentDateValid(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: false
                })
            }
        } else if (name === 'consignee') {
            if (!isConsigneeValid(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: false
                })
            }
        } else if (name === 'delivery_address') {
            if (!isAddressValid(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: false
                })
            }
        } else if (name === 'client') {
            if (!value) {
                if (formData.service_company) {
                    // if only one of the fields
                    setFormErrors({
                        ...formErrors,
                        [name]: true,
                    })
                } else {
                    // if both are empty
                    setFormErrors({
                        ...formErrors,
                        [name]: false,
                        service_company: false
                    })
                }
            } else {
                // if only one of the fields
                if (!formData.service_company) {
                    setFormErrors({
                        ...formErrors,
                        service_company: true
                    })
                } else {
                    // if both have values
                    setFormErrors({
                        ...formErrors,
                        [name]: false,
                        service_company: false
                    })
                }
            }
        } else if (name === 'service_company') {
            if (!value) {
                if (formData.client) {
                    // if only one of the fields
                    setFormErrors({
                        ...formErrors,
                        [name]: true,
                    })
                } else {
                    // if both are empty
                    setFormErrors({
                        ...formErrors,
                        [name]: false,
                        client: false
                    })
                }
            } else {
                // if only one of the fields
                if (!formData.client) {
                    setFormErrors({
                        ...formErrors,
                        client: true
                    })
                } else {
                    // if both have values
                    setFormErrors({
                        ...formErrors,
                        [name]: false,
                        client: false
                    })
                }
            }
        }
    }

    function handleContractChange(e) {
        const  {name, value} = e.target

        setContract({
            ...contract,
            [name]: value
        })

        
        if (name === 'contractNumber') {
            setFormData({
                ...formData,
                supply_contract_number_date: `${value}, ${contract.contractDate}`
            })

            let nextContractErrors
            if (!isContractNumberValid(value)) {
                nextContractErrors = {
                    ...nextContractErrors,
                    contractNumber: 'Введите корректные данные'
                }
            } else if (!value) {
                if (contract.contractDate) {
                    // if one field is empty
                    nextContractErrors = {
                        ...nextContractErrors,
                        contractNumber: <>Это поле обязательно, если указана<br /> дата договора</>
                    }
                } else {
                    // if both are empty
                    nextContractErrors = {
                        contractDate: false,
                        contractNumber: false
                    }
                }
            } else {
                nextContractErrors = {
                    ...nextContractErrors,
                    contractNumber: false
                }
                if (!contract.contractDate) {
                    // if one field is empty
                    nextContractErrors = {
                        ...nextContractErrors,
                        contractDate: <>Это поле обязательно, если указан<br /> номер договора</>
                    }
                } else {
                    // if both fields have values
                    nextContractErrors = {
                        contractDate: isContractDateValid(contract.contractDate) ? false : 'Введите корректные данные',
                        contractNumber: false
                    }
                }
            }
            setContractErrors(nextContractErrors)
        } else if (name === 'contractDate') {
            setFormData({
                ...formData,
                // supply_contract_number_date: `${contract.contractNumber}, ${formatDate(value)}`
                supply_contract_number_date: `${contract.contractNumber}, ${value}`
            })

            let nextContractErrors
            if (!isContractDateValid(value)) {
                nextContractErrors = {
                    ...nextContractErrors,
                    contractDate: 'Введите корректные данные'
                }
            } else if (!value) {
                if (contract.contractNumber) {
                    // if one field is empty
                    nextContractErrors = {
                        ...nextContractErrors,
                        contractDate: <>Это поле обязательно, если указан<br /> номер договора</>
                    }
                } else {
                    // if both are empty
                    nextContractErrors = {
                        contractDate: false,
                        contractNumber: false
                    }
                }
            } else {
                nextContractErrors = {
                    ...nextContractErrors,
                    contractDate: false
                }
                if (!contract.contractNumber) {
                    // if one field is empty
                    nextContractErrors = {
                        ...nextContractErrors,
                        contractNumber: <>Это поле обязательно, если указана<br /> дата договора</>
                    }
                } else {
                    // if both fields have values
                    nextContractErrors = {
                        contractDate: false,
                        contractNumber: isContractNumberValid(contract.contractNumber) ? false : 'Введите корректные данные'
                    }
                }
            }
            setContractErrors(nextContractErrors)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsPending(true)

        let requestData = formData

        if (!(contract.contractDate && contract.contractNumber)) {
            requestData = {
                ...formData,
                supply_contract_number_date: ''
            }
        }

        if (!formData.additional_equipment) {
            requestData = {
                ...requestData,
                additional_equipment: null
            }
        }

        try {
            let resp
            if (machine) {
                // editing
                resp = await axios.patch(`${MACHINE_URL}${machine.serial_number}/`, requestData)
            } else {
                // creating
                resp = await axios.post(MACHINE_URL, requestData)
            }
            const machineResponseData = resp.data
            setIsPending(false)
            navigate(`/machine/${machineResponseData.serial_number}`, {
                state: {
                    machine: {
                        ...machineResponseData,
                        equipment_model: catalog.find((equipment_model) => equipment_model.id === machineResponseData.equipment_model),
                        engine_model: catalog.find((engine_model) => engine_model.id === machineResponseData.engine_model),
                        transmission_model: catalog.find((transmission_model) => transmission_model.id === machineResponseData.transmission_model),
                        drive_axle_model: catalog.find((drive_axle_model) => drive_axle_model.id === machineResponseData.drive_axle_model),
                        controlled_bridge_model: catalog.find(
                            (controlled_bridge_model) => controlled_bridge_model.id === machineResponseData.controlled_bridge_model
                        ),
                        client: usersCatalog.find((client) => client.id === machineResponseData.client),
                        service_company: usersCatalog.find((service_company) => service_company.id === machineResponseData.service_company),
                    }
                },
                replace: true
            })
        } catch (error) {
            setIsPending(false)
            if (error.response?.data.serial_number?.includes('machine with this Заводской номер already exists.')) {
                setAlreadyExistsError(true)
                if (machine) {
                    throw new Error(error);
                }
            } else {
                console.error(error)
            }
        }
    }

    return {
        formData,
        setFormData,
        formErrors,
        setFormErrors,
        contract,
        contractErrors,
        alreadyExists: alreadyExistsError,
        setAlreadyExistsError,
        catalog,
        usersCatalog,
        isDisabled,
        isPending,
        handleInputChange,
        handleContractChange,
        handleSubmit
    }
}