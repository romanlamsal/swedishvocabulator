package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.module.kotlin.readValue
import de.lamsal.vocabulator.util.JsonUtil
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

private const val VERB_JSON = """{
  "german" : "schließen",
  "wordtype" : "VERB",
  "swedish" : {
    "infinitive" : "stänga",
    "preterite" : "stängde",
    "imperative" : "stäng",
    "present_tense" : "stänger",
    "supinum" : "stängt"
  }
}"""

private const val NOUN_JSON = """{
  "german" : "Raum",
  "wordtype" : "NOUN",
  "swedish" : {
    "singular_definite" : "rummet",
    "singular_indefinite" : "rum",
    "noun_type" : "ett",
    "plural_definite" : "rummen",
    "plural_indefinite" : "rum"
  }
}"""

private const val ADJECTIVE_JSON = """{
  "german" : "fett",
  "wordtype" : "ADJ",
  "swedish" : {
    "singular_definite" : "tjusiga",
    "singular_utrum_indefinite" : "tjusig",
    "singular_neutrum_indefinite" : "tjusigt",
    "plural" : "tjusiga",
    "comparative" : "tjusigare",
    "superlative" : "tjusigast"
  }
}"""

private const val FREE_TEXT_JSON = """{
  "german" : "Erst mal nur ein Satz",
  "wordtype" : "FREE_TEXT",
  "swedish" : {
    "value" : "Enda en mening."
  }
}"""

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

internal class IndexCardFromJsonTest {
    @Test
    fun `can parse VERB from json`() {
        assertEquals(verbCard, JsonUtil().readValue<IndexCard>(VERB_JSON))
    }

    @Test
    fun `can parse NOUN from json`() {
        assertEquals(nounCard, JsonUtil().readValue<IndexCard>(NOUN_JSON))
    }

    @Test
    fun `can parse ADJECTIVE from json`() {
        assertEquals(adjectiveCard, JsonUtil().readValue<IndexCard>(ADJECTIVE_JSON))
    }

    @Test
    fun `can parse FREE TEXT from json`() {
        assertEquals(freeTextCard, JsonUtil().readValue<IndexCard>(FREE_TEXT_JSON))
    }
}

internal class IndexCardToJsonTest {
    fun toJson(obj: Any) = JsonUtil().writerWithDefaultPrettyPrinter().writeValueAsString(obj).replace("\r\n", "\n")

    @Test
    fun `can parse VERB to json`() {
        assertEquals(VERB_JSON, toJson(verbCard))
    }

    @Test
    fun `can parse NOUN to json`() {
        assertEquals(NOUN_JSON, toJson(nounCard))
    }

    @Test
    fun `can parse ADJECTIVE to json`() {
        assertEquals(ADJECTIVE_JSON, toJson(adjectiveCard))
    }

    @Test
    fun `can parse FREE TEXT to json`() {
        assertEquals(FREE_TEXT_JSON, toJson(freeTextCard))
    }
}

