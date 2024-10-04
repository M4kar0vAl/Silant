export function isSparePartsValid(spareParts) {
    // буквы русского и латинского алфавита, цифры, ; и пробел. Не больше 256 символов
    let regexp = /^[A-Za-zА-Яа-я\d; ]{0,256}$/
    return regexp.test(spareParts)
}