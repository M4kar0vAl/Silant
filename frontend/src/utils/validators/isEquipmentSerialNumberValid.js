export function isEquipmentSerialNumberValid(serialNumber) {
    // 6 - 10 символов. Цифры и заглавные буквы латинского алфавита
    let regexp = /^[\dA-Z]{6,10}$/
    return regexp.test(serialNumber)
}