import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CATALOG_URL } from "../constants";

export function useCatalogForm(catalogObj=null) {
    const navigate = useNavigate()
    
    const [isPending, setIsPending] = useState(false)

    const [formData, setFormData] = useState(
        catalogObj
        ?
        // editing
        {
            name: catalogObj.name,
            entity: catalogObj.entity,
            description: catalogObj.description
        }
        :
        // creating
        {
            name: '',
            entity: '',
            description: ''
        }
    )

    const [formErrors, setFormErrors] = useState({
        name: false,
        entity: false,
        description: false
    })

    let isDisabled = true
    isDisabled = Object.values(formErrors).some((value) => value)

    if (!isDisabled) {
        isDisabled = !Object.entries(formData).every(([, value]) => value)
    }

    function handleInputChange(e) {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })

        if (name === 'name') {
            if (value.length > 128 || !value) {
                setFormErrors({
                    ...formErrors,
                    name: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    name: false
                })
            }
        } else if (name === 'entity') {
            if (!value) {
                setFormErrors({
                    ...formErrors,
                    entity: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    entity: false
                })
            }
        } else if (name === 'description') {
            if (value.length > 256 || !value) {
                setFormErrors({
                    ...formErrors,
                    description: true
                })
            } else {
                setFormErrors({
                    ...formErrors,
                    description: false
                })
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setIsPending(true)

        try {
            let resp
            if (catalogObj) {
                resp = await axios.patch(`${CATALOG_URL}${catalogObj.id}/`, formData)
            } else {
                resp = await axios.post(CATALOG_URL, formData)
            }
            const catalogResponseData = resp.data
            navigate(`/catalog/${catalogResponseData.id}`, {
                state: {
                    catalog: catalogResponseData
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
        isPending
    }
}