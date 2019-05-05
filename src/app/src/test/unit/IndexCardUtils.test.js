import {cardIsEmpty} from "../../util/IndexCardUtil";

const adjectiveFieldsToLabel = {
    singular_utrum_indefinite: "Sg. u. obest.",
    singular_neutrum_indefinite: "Sg. n. obest.",
    singular_definite: "Sg. best.",
    plural: "Pl.",
    comparative: "Comp.",
    superlative: "Sup."
}

const nounFieldsToLabel = {
    singular_indefinite: "Sg. obest.",
    noun_type: "en/ett",
    singular_definite: "Sg. best.",
    plural_indefinite: "Pl. obest.",
    plural_definite: "Pl. best."
}

describe("cardIsEmpty", () => {
    it("one empty VERB card", () => {
        expect(cardIsEmpty({
            german: "", swedish: {
                infinitive: "",
                present_tense: "",
                preterite: "",
                imperative: "",
                supinum: ""
            }
        })).toBeTruthy()
    })
    it("one non-empty VERB card (german)", () => {
        expect(cardIsEmpty({
            german: "foo", swedish: {
                infinitive: "",
                present_tense: "",
                preterite: "",
                imperative: "",
                supinum: ""
            }
        })).toBeFalsy()
    })
    it("one non-empty VERB card (swedish)", () => {
        expect(cardIsEmpty({
            german: "", swedish: {
                infinitive: "",
                present_tense: "foo",
                preterite: "",
                imperative: "",
                supinum: ""
            }
        })).toBeFalsy()
    })
})