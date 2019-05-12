package de.lamsal.vocabulator.service

import de.lamsal.vocabulator.entity.FreeTextCard
import de.lamsal.vocabulator.entity.LectureResult
import de.lamsal.vocabulator.repository.LectureResultRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

internal class LectureResultServiceTest {
    private companion object {
        const val username = "username"
        const val json = """{"wrong":[{"german":"falsch","wordtype":"FREE_TEXT","swedish":{"value":"fel"},"id":"falsch"}],"correct":[{"german":"richtig","wordtype":"FREE_TEXT","swedish":{"value":"riktig"},"id":"richtig"}]}"""
    }

    private lateinit var lectureResultRepository: MockedLectureResultRepository
    private lateinit var lectureResultService: LectureResultService

    @BeforeEach
    fun setup() {
        lectureResultRepository = MockedLectureResultRepository()
        lectureResultService = LectureResultService(lectureResultRepository)
    }

    @Test
    fun `should save json`() {
        lectureResultService.save(json, username)

        assertEquals(listOf(
                LectureResult(username, false, FreeTextCard("falsch", "fel", "falsch")),
                LectureResult(username, true, FreeTextCard("richtig", "riktig", "richtig"))
        ), lectureResultRepository.saved)
    }

    inner class MockedLectureResultRepository : LectureResultRepository {

        val saved = emptyList<LectureResult>().toMutableList()

        override fun save(lectureResult: LectureResult) {
            saved.add(lectureResult)
        }
    }
}