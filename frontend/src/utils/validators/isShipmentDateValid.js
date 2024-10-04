export function isShipmentDateValid(shipmentDate) {
    // unrequired field
    if (!shipmentDate) return true
    
    // shipment date less than or equals now
    return Date.parse(shipmentDate) <= Date.now()
}