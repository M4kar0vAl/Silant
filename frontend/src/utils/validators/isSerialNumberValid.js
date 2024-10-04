export function isSerialNumberValid(serialNumber) {
    // от 4 до 10 цифр
    let regexp = /^\d{4,10}$/
    return regexp.test(serialNumber)
}