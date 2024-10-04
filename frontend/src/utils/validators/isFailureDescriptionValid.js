export function isFailureDescriptionValid(failureDescription) {
    // буквы русского и английского алфавита и пробел, не больше 256 символов
    let regexp = /^[А-Яа-яA-Za-z ]{1,256}$/
    return regexp.test(failureDescription)
}