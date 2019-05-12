export function sendResult(wrong, correct) {
    if (wrong.length === 0 && correct.length === 0)
        console.log("Empty result to send; doing nothing.")
    fetch(process.env.REACT_APP_API_URL + /result/, {
        method: "POST",
        body: JSON.stringify({wrong, correct})
    })
        .then(() => console.log("Send result."))
        .catch(error => console.error("Error send results:", error))
}