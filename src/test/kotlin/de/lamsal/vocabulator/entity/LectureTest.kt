package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import de.lamsal.vocabulator.util.JsonUtil
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class LectureTest {

    private companion object {
        val json = """{
    "name": "Unit Testing",
    "description": "Example lecture for unit tests in the backend.",
    "index_cards": [
        {
            "german": "Erst mal nur ein Satz",
            "wordtype": "FREE_TEXT",
            "swedish": {
                "value": "Enda en mening."
            }
        },
        {
            "german": "schließen",
            "wordtype": "VERB",
            "swedish": {
                "present_tense": "stänger",
                "preterite": "stängde",
                "imperative": "stäng",
                "infinitive": "stänga",
                "supinum": "stängt"
            }
        },
        {
            "german": "Raum",
            "wordtype": "NOUN",
            "swedish": {
                "noun_type": "ett",
                "singular_indefinite": "rum",
                "singular_definite": "rummet",
                "plural_indefinite": "rum",
                "plural_definite": "rummen"
            }
        },
        {
            "german": "fett",
            "wordtype": "ADJ",
            "swedish": {
                "singular_utrum_indefinite": "tjusig",
                "singular_neutrum_indefinite": "tjusigt",
                "plural": "tjusiga",
                "singular_definite": "tjusiga",
                "comparative": "tjusigare",
                "superlative": "tjusigast"
            }
        },
        {
            "german": "",
            "wordtype": "FREE_TEXT",
            "swedish": {
                "value": ""
            }
        }
    ]
}"""
    }

    private val verbCard = VerbCard("schließen", Verb(
            "stänga", "stängde", "stäng", "stänger", "stängt"
    ))

    private val nounCard = NounCard("Raum", Noun(
            "rummet", "rum", "ett", "rummen", "rum"
    ))

    private val adjectiveCard = AdjectiveCard("fett", Adjective(
            "tjusiga", "tjusig", "tjusigt", "tjusiga", "tjusigare", "tjusigast"
    ))

    private val freeTextCard = FreeTextCard("Erst mal nur ein Satz", FreeText(
            "Enda en mening."
    ))

    @Test
    fun `can parse empty lecture from json`() {
        assertEquals(Lecture(), JsonUtil().readValue<Lecture>("""{"name":"", "description": "", "index_cards": []}"""))
    }

    @Test
    fun `can parse whole lecture from json`() {
        val deserialized: Lecture = JsonUtil().readValue(json)
        assertEquals(Lecture("Unit Testing", "Example lecture for unit tests in the backend.", listOf(
                freeTextCard, verbCard, nounCard, adjectiveCard, FreeTextCard(german = "", swedish = FreeText(""))
        ).toMutableList()), deserialized)
    }
}