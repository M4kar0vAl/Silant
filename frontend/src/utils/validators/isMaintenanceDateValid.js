export function isMaintenanceDateValid(maintenanceDate) {
    return Date.parse(maintenanceDate) <= Date.now()
}