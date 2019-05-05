const request = require("request")
const { parse } = require('node-html-parser')
const _ = require("lodash")

const getUrlFromQuery = query => (process.env.REACT_APP_SVENSKASE_PROXY || document.location.origin) + "/svenskase?sok="
    + encodeURIComponent(query.trim().split(/\s/).join("+"))

export const TYPE_NOT_FOUND_EXCEPTION = "Wanted type not found."

const WORD_TYPES = {
    substantiv: "NOUN",
    adjektiv: "ADJ",
    verb: "VERB",
    other: "OTHER"
}

export function determineWordType(root) {
    const foundWordType = root.querySelector("a.ordklass")
    if (!foundWordType)
        return "OTHER"

    const foundWordTypeTokens = foundWordType.text.split(/\s/)
    if (_.includes(foundWordTypeTokens, "substantiv"))
        return WORD_TYPES.substantiv
    if (_.includes(foundWordTypeTokens, "adjektiv"))
        return WORD_TYPES.adjektiv
    if (_.includes(foundWordTypeTokens, "verb"))
        return WORD_TYPES.verb

    return "UNKOWN"
}

export function buildVerb(root) {
    const result = {}

    const cases = root.querySelectorAll(".tabell tr *").map(e => e.text.trim())

    const finiteIndex = Math.max(cases.indexOf("Finita former"), 0)
    const infiniteIndex = Math.max(cases.indexOf("Infinita former"), 0)
    const presensParticipIndex = Math.max(cases.indexOf("Presens particip"), 0)

    // finites
    for (let i = finiteIndex + 2; i < infiniteIndex; i += 2) {
        if (cases[i] === "presens aktiv")
            result.present_tense = cases[i-1]
        else if (cases[i] === "preteritum aktiv")
            result.preterite = cases[i-1]
        else if (cases[i] === "imperativ aktiv")
            result.imperative = cases[i-1]
    }

    // infinites
    for (let i = infiniteIndex + 2; i < presensParticipIndex; i += 2) {
        if (cases[i] === "infinitiv aktiv")
            result.infinitive = cases[i-1].replace("att", "").trim()
        else if (cases[i] === "supinum aktiv")
            result.supinum = cases[i-1].replace("har/hade", "").trim()
    }

    return result
}

export function buildAdjective(root) {
    const result = {}

    const cases = root.querySelectorAll(".tabell tr *").map(e => e.text.split("+")[0].trim())

    const positiveIndex = Math.max(cases.indexOf("Positiv"), 0)
        || Math.max(cases.indexOf("Ordform(er)"), 0)
        || Math.max(cases.indexOf("Perfekt particip"), 0) // build adjective from verb
    const comparativeIndex = Math.max(cases.indexOf("Komparativ"), 0)
    const superlativeIndex = cases.indexOf("Superlativ")

    // positives
    for (let i = positiveIndex + 1; i < (comparativeIndex || cases.length); i += 1) {
        let [indicator, form] = cases[i].split(/\s/)
        indicator = indicator.split("/")


        if (_.includes(indicator, "en"))
            result.singular_utrum_indefinite = form
        if (_.includes(indicator, "ett"))
            result.singular_neutrum_indefinite = form
        if (_.includes(indicator, "de"))
            result.plural = form
        if (_.includes(indicator, "den") && _.includes(indicator, "det"))
            result.singular_definite = form
    }

    // komparatives
    result.comparative = cases[comparativeIndex + 1].split(/\s/)[1]

    // superlatives
    for (let i = superlativeIndex + 1; i < cases.length; i += 1) {
        let [indicator, form] = cases[i].split(/\s/)
        if (indicator === "är") {
            result.superlative = form
            break;
        }
    }

    // no comparative and superlative
    if (comparativeIndex === 0 && superlativeIndex === -1) {
        result.comparative = null
        result.superlative = null
    }

    // e.g. "fel" has no comparative and no positives, only one form: "fel"
    if (positiveIndex === cases.length - 2) {
        result.singular_definite = cases[positiveIndex + 1]
        result.singular_utrum_indefinite = cases[positiveIndex + 1]
        result.singular_neutrum_indefinite = cases[positiveIndex + 1]
        result.plural = cases[positiveIndex + 1]
    }

    return result
}

export function buildNoun(root) {
    const result = {}

    const cases = root.querySelectorAll(".tabell tr *").map(e => e.text.trim())

    result.noun_type = root.querySelector(".ordform i").text

    const singularIndex = Math.max(cases.indexOf("Singular"), 0)
    const pluralIndex = Math.max(cases.indexOf("Plural"), 0)

    // singulars
    for (let i = singularIndex + 2; i < pluralIndex; i += 2) {
        if (cases[i] === "obestämd form")
            result.singular_indefinite = cases[i-1].replace(result.noun_type, "").trim()
        else if (cases[i] === "bestämd form")
            result.singular_definite = cases[i-1]
    }

    // plural
    for (let i = pluralIndex + 2; i < cases.length; i += 2) {
        if (cases[i] === "obestämd form")
            result.plural_indefinite = cases[i-1].replace(result.noun_type, "").trim()
        else if (cases[i] === "bestämd form")
            result.plural_definite = cases[i-1]
    }

    return result
}

export function processSvenskaSeRequest(error, response, body, expectedWordType) {
    if (error)
        console.log("ERROR:", error)

    const forms = parse(body).querySelectorAll(".lemma")
    const wordTypes = forms.map(lemma => determineWordType(lemma))

    console.log("Found wordtypes", wordTypes)

    let wordType
    let rootOfWordType
    if (expectedWordType) {
        rootOfWordType = forms[wordTypes.indexOf(expectedWordType.toUpperCase())]

        if (rootOfWordType === undefined) {
            if (expectedWordType.toUpperCase() === "ADJ" && _.includes(wordTypes, "VERB")) // adjective not found but verb (which can be adjectivatated) is there
                rootOfWordType = forms[wordTypes.indexOf("VERB")]
            else if (_.includes(wordTypes, "OTHER")) {
                console.log("Expected word type not found, try to work with the OTHER entry")
                rootOfWordType = forms[wordTypes.indexOf("OTHER")]
            } else
                throw TYPE_NOT_FOUND_EXCEPTION
        }

        wordType = expectedWordType.toUpperCase()
    } else if (forms.length === 1) {
        [rootOfWordType, wordType] = [forms[0], wordTypes[0]]
    } else {
        [rootOfWordType, wordType] = [forms[0], wordTypes[0]]
        console.log("No expected word type, using first lemma of type '" + wordType + "'")
    }

    switch (wordType) {
        case "ADJ":
            return ["ADJ", buildAdjective(rootOfWordType)]
        case "NOUN":
            return ["NOUN", buildNoun(rootOfWordType)]
        case "VERB":
            return ["VERB", buildVerb(rootOfWordType)]
        case "UNKNOWN":
            throw "Wordtype 'UNKNOWN'."
        default:
            throw "Unknown wordtype '" + wordType + "'"
    }
}

export function getResult(query, expectedWordType, callback=(() => null), onError=(() => null)) {
    const {url, ...options} = {
        url: getUrlFromQuery(query),
        headers: {
            "Content-Type": "text/plain",
            "Origin": "svenska.se",
            //"Accept": "text/html; charset=UTF-8"
        }
    }

    console.log("Sending request to", url)

    request(url, options,(error, response, body) => {
        try {
            const result = processSvenskaSeRequest(error, response, body, expectedWordType)
            callback(result)
        } catch(error) {
            onError(error)
        }
    })
}
