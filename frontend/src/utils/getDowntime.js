export function getDowntime(failureDateStr, recoveryDateStr) {
    const failureDate = new Date(failureDateStr)
    const recoveryDate = new Date(recoveryDateStr)
    const millisecondsInDay = 1000 * 60 * 60 * 24

    return (recoveryDate - failureDate) / millisecondsInDay
}