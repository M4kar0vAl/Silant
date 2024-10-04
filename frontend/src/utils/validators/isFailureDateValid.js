export function isFailureDateValid(failureDate) {
    // checks if date less than or equals current date
    return Date.parse(failureDate) <= Date.now()
}