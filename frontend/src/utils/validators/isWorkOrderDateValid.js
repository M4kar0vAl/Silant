export function isWorkOrderDateValid(work_order_date) {
    return Date.parse(work_order_date) <= Date.now()
}