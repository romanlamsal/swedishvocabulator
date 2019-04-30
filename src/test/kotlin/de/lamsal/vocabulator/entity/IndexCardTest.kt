package de.lamsal.vocabulator.entity

import de.lamsal.vocabulator.*
import de.lamsal.vocabulator.util.JsonUtil
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class IndexCardFromJsonTest {
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

