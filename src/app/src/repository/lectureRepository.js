const URL_TO_SAVE = ""

export function save(name, description, indexCards) {
    console.log(JSON.stringify({
        name, description, indexCards
    }, null, 4))
}