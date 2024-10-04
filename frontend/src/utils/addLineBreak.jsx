export function addLineBreak(string) {
    return string?.split(';').map((substr) => (
        <span key={crypto.randomUUID()}>
            {substr}
            <br />
        </span>
    ))
}