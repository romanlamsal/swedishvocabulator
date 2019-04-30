package de.lamsal.vocabulator.entity

import de.lamsal.vocabulator.*
import de.lamsal.vocabulator.util.JsonUtil
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

internal class IndexCardToJsonTest {
    fun toJson(obj: Any) = JsonUtil().writerWithDefaultPrettyPrinter().writeValueAsString(obj).replace("\r\n", "\n")

    @Test
    fun `can parse VERB to json`() {
        Assertions.assertEquals(VERB_JSON, toJson(VERB_CARD))
    }

    @Test
    fun `can parse NOUN to json`() {
        Assertions.assertEquals(NOUN_JSON, toJson(NOUN_CARD))
    }

    @Test
    fun `can parse ADJECTIVE to json`() {
        Assertions.assertEquals(ADJECTIVE_JSON, toJson(ADJECTIVE_CARD))
    }

    @Test
    fun `can parse FREE TEXT to json`() {
        Assertions.assertEquals(FREE_TEXT_JSON, toJson(FREE_TEXT_CARD))
    }
}