export function isContractDateValid(contractDate) {
    // this field is not required
    if (!contractDate) return true
    
    // contract date less than or equals now
    return Date.parse(contractDate) <= Date.now()
}