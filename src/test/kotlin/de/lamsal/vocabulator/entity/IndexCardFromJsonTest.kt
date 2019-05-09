package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.module.kotlin.readValue
import de.lamsal.vocabulator.*
import de.lamsal.vocabulator.util.JsonUtil
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class IndexCardFromJsonTest {
    private companion object {
        const val incompleteCard = """{
  "german" : "fett",
  "wordtype" : "ADJ",
  "swedish" : {
    "singular_definite" : "tjusiga",
    "singular_utrum_indefinite" : "tjusig",
    "singular_neutrum_indefinite" : "tjusigt"
  }
}"""
    }

    @Test
    fun `can parse incomplete card`() {
        assertEquals(AdjectiveCard("fett", Adjective(
                singularDefinite = "tjusiga", singularUtrumIndefinite = "tjusig", singularNeutrumIndefinite = "tjusigt"
        )), JsonUtil().readValue(incompleteCard, IndexCard::class.java))
    }

    @Test
    fun `can parse VERB from json`() {
        assertEquals(VERB_CARD, JsonUtil().readValue(VERB_JSON, IndexCard::class.java))
    }

    @Test
    fun `can parse NOUN from json`() {
        assertEquals(NOUN_CARD, JsonUtil().readValue(NOUN_JSON, IndexCard::class.java))
    }

    @Test
    fun `can parse ADJECTIVE from json`() {
        assertEquals(ADJECTIVE_CARD, JsonUtil().readValue(ADJECTIVE_JSON, IndexCard::class.java))
    }

    @Test
    fun `can parse FREE TEXT from json`() {
        assertEquals(FREE_TEXT_CARD, JsonUtil().readValue(FREE_TEXT_JSON, IndexCard::class.java))
    }
}

