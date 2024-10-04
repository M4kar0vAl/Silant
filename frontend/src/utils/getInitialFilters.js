export function getInitialFilters(entity) {
    switch (entity) {
        case 'machine':
            return {
                equipment_model: '',
                engine_model: '',
                transmission_model: '',
                drive_axle_model: '',
                controlled_bridge_model: ''
            }
        case 'maintenance':
            return {
                type: '',
                machine_serial_number: '',
                service_company: ''
            }
        case 'reclamation':
            return {
                failure_node: '',
                recovery_method: '',
                service_company: ''
            }
    }
}