export function isWorkOrderNumberValid(workOrderNumber) {
    // # + 4 цифры + "-" + 7-9 цифр или заглавных букв русккого или латинского алфавита
    let regexp = /^#\d{4}\-[\dA-ZА-Я]{7,9}$/
    return regexp.test(workOrderNumber)
}