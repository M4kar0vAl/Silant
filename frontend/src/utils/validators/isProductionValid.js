export function isProductionValid(production) {
    // 1 - 5 цифр
    let regexp = /^\d{1,5}$/
    return regexp.test(production)
}