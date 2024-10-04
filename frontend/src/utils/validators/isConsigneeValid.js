export function isConsigneeValid(consignee) {
    // 1 - 256 символов. Цифры, буквы, . - № " и пробел
    let regexp = /^[\dA-Za-zА-Яа-я\.\-№" ]{0,256}$/
    return regexp.test(consignee)
}