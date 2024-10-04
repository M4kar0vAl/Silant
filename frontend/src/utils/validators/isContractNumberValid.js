export function isContractNumberValid(contractNumber) {
    // необязательное поле
    if (!contractNumber) return true

    // 10 цифр
    let regexp = /^\d{10}$/
    return regexp.test(contractNumber)
}