package de.lamsal.vocabulator.entity

import de.lamsal.vocabulator.LECTURE
import de.lamsal.vocabulator.util.JsonUtil
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class LectureEntityMetaTest {

    private companion object {
        const val lectureId = "lectureId"
        val lectureEntityMeta = LectureEntityMeta(lectureId, LECTURE)
        const val json = """{"name":"Unit Testing","description":"Example lecture for unit tests in the backend.","id":"lectureId"}"""
    }

    @Test
    fun `should serialize`() {
        assertEquals(json, JsonUtil().writeValueAsString(lectureEntityMeta))
    }
}