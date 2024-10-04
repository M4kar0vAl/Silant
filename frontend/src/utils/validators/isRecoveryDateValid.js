export function isRecoveryDateValid(recoveryDate, failureDate) {
    // checks if recovery date is more than or equals failure date
    return Date.parse(recoveryDate) >= Date.parse(failureDate)
}