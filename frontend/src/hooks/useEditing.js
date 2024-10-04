import { useState } from "react";

export function useEditing(entity, instance, setFormData, setFormErrors, handleSubmit, setAlreadyExistsError) {
    let initialFormData
    let initialFormErrors
    switch (entity) {
        case 'machine':
            initialFormData = {
                serial_number: instance.serial_number,
                equipment_model: instance.equipment_model?.id,
                engine_model: instance.engine_model?.id,
                engine_serial_number: instance.engine_serial_number,
                transmission_model: instance.transmission_model?.id,
                transmission_serial_number: instance.transmission_serial_number,
                drive_axle_model: instance.drive_axle_model?.id,
                drive_axle_serial_number: instance.drive_axle_serial_number,
                controlled_bridge_model: instance.controlled_bridge_model?.id,
                controlled_bridge_serial_number: instance.controlled_bridge_serial_number,
                supply_contract_number_date: instance.supply_contract_number_date,
                shipment_date: instance.shipment_date,
                consignee: instance.consignee,
                delivery_address: instance.delivery_address,
                additional_equipment: instance.additional_equipment,
                client: instance.client?.id,
                service_company: instance.service_company?.id
            }
            initialFormErrors = {
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
            }
            break;
        case 'maintenance':
            initialFormData = {
                type: instance.type.id,
                date: instance.date,
                production: instance.production,
                work_order_number: instance.work_order_number,
                work_order_date: instance.work_order_date,
                maintenance_carry_out: instance.maintenance_carry_out?.id,
                machine: instance.machine.id,
                service_company: instance.service_company.id
            }
            initialFormErrors = {
                date: false,
                production: false,
                work_order_number: false,
                work_order_date: false,
                service_company: false
            }
            break;
        case 'reclamation':
            initialFormData = {
                failure_date: instance.failure_date,
                production: instance.production,
                failure_node: instance.failure_node.id,
                failure_description: instance.failure_description,
                recovery_method: instance.recovery_method.id,
                spare_parts: instance.spare_parts,
                recovery_date: instance.recovery_date,
                machine: instance.machine.id,
                service_company: instance.service_company.id
            }
            initialFormErrors = {
                failure_date: false,
                production: false,
                failure_description: false,
                spare_parts: false,
                recovery_date: false,
            }
            break;
        case 'catalog':
            initialFormData = {
                name: instance.name,
                entity: instance.entity,
                description: instance.description
            }
            initialFormErrors = {
                name: false,
                entity: false,
                description: false
            }
    }

    const [isEditing, setIsEditing] = useState(false)

    async function handleSaveClick(e) {
        const nextIsEditing = !isEditing

        try {
            if (!nextIsEditing) {
                await handleSubmit(e)
            }
        } catch (error) {
            // throws error only if machine with this serial number already exists
            // if so, then don't close editing mode
            return
        }
        
        setIsEditing(nextIsEditing)
    }

    function handleDissmissClick() {
        setIsEditing(false)
        setFormData(initialFormData)
        setFormErrors(initialFormErrors)
        if (setAlreadyExistsError) {
            setAlreadyExistsError(false)
        }
    }

    return {
        isEditing,
        handleSaveClick,
        handleDissmissClick
    }
}