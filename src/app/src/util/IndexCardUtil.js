import {
    AdjectiveCard,
    AdjectiveCardEdit,
    FreeTextCard,
    FreeTextCardEdit, NounCard,
    NounCardEdit,
    VerbCard,
    VerbCardEdit
} from "../components/SwedishCard";

export const WORDTYPES = {
    FREE_TEXT: "FREE_TEXT",
    VERB: "VERB",
    ADJECTIVE: "ADJ",
    NOUN: "NOUN"
}

export const cardIsEmpty = (card) => !Boolean(
    [card.german, ...Object.values(card.swedish)].filter(e => e !== "").length
)

export function getEditComponentByWordtype(wordtype) {
    switch (wordtype) {
        case WORDTYPES.FREE_TEXT:
            return FreeTextCardEdit
        case WORDTYPES.VERB:
            return VerbCardEdit
        case WORDTYPES.ADJECTIVE:
            return AdjectiveCardEdit
        case WORDTYPES.NOUN:
            return NounCardEdit
    }
}

export function getDisplayComponentByWordtype(wordtype) {
    switch (wordtype) {
        case WORDTYPES.FREE_TEXT:
            return FreeTextCard
        case WORDTYPES.VERB:
            return VerbCard
        case WORDTYPES.ADJECTIVE:
            return AdjectiveCard
        case WORDTYPES.NOUN:
            return NounCard
    }
}