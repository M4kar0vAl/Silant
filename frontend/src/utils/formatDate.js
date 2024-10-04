export function formatDate(dateString) {
    if (!dateString) return null
    return (new Date(dateString)).toLocaleDateString(
        'ru-RU', {day: 'numeric', month: 'numeric', year: 'numeric'}
    )
}