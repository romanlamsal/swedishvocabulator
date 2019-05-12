package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.module.kotlin.readValue
import de.lamsal.vocabulator.*
import de.lamsal.vocabulator.util.JsonUtil
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
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
        const val incompleteLectureJson = """{"name": "", "description": "", "index_cards": [{
  "german" : "fett",
  "wordtype" : "ADJ",
  "swedish" : {
    "singular_definite" : "tjusiga",
    "singular_utrum_indefinite" : "tjusig",
    "singular_neutrum_indefinite" : "tjusigt"
  }
}]}"""
    }

    @Test
    fun `can parse empty lecture from json`() {
        assertEquals(Lecture(), JsonUtil().readValue<Lecture>("""{"name":"", "description": "", "index_cards": []}"""))
    }

    @Test
    fun `can parse whole lecture from json`() {
        assertEquals(LECTURE, JsonUtil().readValue(json, Lecture::class.java))
    }

    @Test
    fun `can parse lecture with incomplete indexCards`() {
        assertEquals(Lecture(indexCards = listOf(AdjectiveCard("fett", Adjective(
                singularDefinite = "tjusiga", singularUtrumIndefinite = "tjusig", singularNeutrumIndefinite = "tjusigt"
        )))), JsonUtil().readValue(incompleteLectureJson, Lecture::class.java))
    }
}