package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import de.lamsal.vocabulator.ADJECTIVE_JSON
import de.lamsal.vocabulator.FREE_TEXT_JSON
import de.lamsal.vocabulator.NOUN_JSON
import de.lamsal.vocabulator.VERB_JSON
import de.lamsal.vocabulator.util.JsonUtil
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class LectureTest {

    private companion object {
        val json = """{
    "name": "Unit Testing",
    "description": "Example lecture for unit tests in the backend.",
    "index_cards": [
        $FREE_TEXT_JSON,
        $VERB_JSON,
        $NOUN_JSON,
        $ADJECTIVE_JSON,
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
        assertEquals(Lecture("Unit Testing", "Example lecture for unit tests in the backend.", listOf(
                freeTextCard, verbCard, nounCard, adjectiveCard, FreeTextCard(german = "", swedish = FreeText(""))
        ).toMutableList()), JsonUtil().readValue(json, Lecture::class.java))
    }
}