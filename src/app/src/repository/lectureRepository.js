import request from 'request'

let URL = process.env.REACT_APP_API_URL + "/lecture/"
if (process.env.REACT_APP_API_URL.startsWith("/"))
    URL = document.location.origin + URL

export function get(onSuccess, onError=(() => null)) { // returns LectureEntityMeta: {name, description, id}
    console.log("Fetching data from", URL)
    request(URL, function(error, response, body) {
        if (error) {
            return onError(error)
        }
        let statusCode = response.statusCode;
        if (statusCode < 300 && statusCode >= 200) {
            onSuccess(JSON.parse(body))
        } else {
            onError(body)
        }
    })
}

export function getById(id, onSuccess, onError=(() => null)) { // returns lecture: {name, description, index_cards
    const url = URL + id

    console.log("Fetching data from", url)

    request(url, function(error, response, body) {
        if (error) {
            return onError(error)
        }
        let statusCode = response.statusCode;
        if (statusCode < 300 && statusCode >= 200) {
            let {index_cards, ...lecture} = JSON.parse(body)
            onSuccess({...lecture, indexCards: index_cards})
        } else {
            onError(body)
        }
    })
}


export function save(id, name, description, indexCards, onSuccess, onError) {
    let url = URL
    if (id)
        url += id

    console.log("Fetching data from", url)

    let body = {name, description, index_cards: indexCards}

    request.post({url, body: JSON.stringify(body), headers: {"Content-Type": "text/plain"}}, function(error, response, body) {
        if (error) {
            return onError(error)
        }
        let statusCode = response.statusCode;
        if (statusCode < 300 && statusCode >= 200) {
            onSuccess(body)
        } else {
            onError(body)
        }
    })
}

