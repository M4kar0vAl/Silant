import { CLIENT, MANAGER, SERVICE } from "../constants"

export function checkCreatePermission(role, entity) {
    switch (entity) {
        case 'machine':
            if (role === MANAGER) {
                return true
            }
            return false
        case 'maintenance':
            return true
        case 'reclamation':
            if (role === CLIENT) {
                return false
            }
            return true
        case 'catalog':
            if (role === MANAGER) {
                return true
            }
            return false
    }
}

export function checkEditPermission(userData, entity, entityObj) {
    const {role, id} = userData

    switch (entity) {
        case 'machine':
            if (role === MANAGER) {
                return true
            }
            return false
        case 'maintenance':
            switch (role) {
                case MANAGER:
                    return true
                case SERVICE:
                    return entityObj.service_company.id === id
                case CLIENT:
                    return entityObj.machine.client.id === id
            }
        case 'reclamation':
            switch (role) {
                case MANAGER:
                    return true
                case SERVICE:
                    return entityObj.service_company.id === id
                case CLIENT:
                    return entityObj.machine.client.id === id
            }
        case 'catalog':
            if (role === MANAGER) {
                return true
            }
            return false
    }
}
