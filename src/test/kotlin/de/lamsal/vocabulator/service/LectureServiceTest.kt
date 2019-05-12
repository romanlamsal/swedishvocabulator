package de.lamsal.vocabulator.service

import de.lamsal.vocabulator.entity.FreeTextCard
import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.entity.LectureEntityMeta
import de.lamsal.vocabulator.repository.LectureRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.nio.charset.StandardCharsets
import java.security.MessageDigest



internal class LectureServiceTest {
    private companion object {
        const val validLectureId = "validId"
        const val newLectureId = "newLectureId"

        val lecture = Lecture("lecture name", "lecture description",
                listOf(FreeTextCard("freier Text", "lediga text")))

        val lectureEntityMeta = LectureEntityMeta(validLectureId, lecture)

        const val lectureJson = """{"name":"lecture name","description":"lecture description","index_cards":[{"german":"freier Text","wordtype":"FREE_TEXT","swedish":{"value":"lediga text"}}]}"""
    }

    lateinit var lectureService: LectureService

    @Test
    fun foo() {
        val digest = MessageDigest.getInstance("SHA-256")
        val encodedhash = digest.digest(
                "mundSchutz135".toByteArray(StandardCharsets.UTF_8))
        println(String(encodedhash))
        println(String(encodedhash, StandardCharsets.UTF_8))
    }

    @BeforeEach
    fun setUp() {
        lectureService = LectureService(MockLectureRepository())
    }

    @Test
    fun `get all lectures without parameter`() {
        assertEquals(listOf(lectureEntityMeta), lectureService.getLectures())
    }

    @Test
    fun `get specific lecture with id parameter`() {
        assertEquals(lecture, lectureService.getLecture(validLectureId))
    }

    @Test
    fun `get null with id which does not exist`() {
        assertNull(lectureService.getLecture("foobarbaz"))
    }

    @Test
    fun `save lecture without id results in newLectureId`() {
        assertEquals(newLectureId, lectureService.saveLecture(lectureJson, null))
    }

    @Test
    fun `save lecture with validLectureId results in validLectureId again`() {
        assertEquals(validLectureId, lectureService.saveLecture(lectureJson, validLectureId))
    }

    inner class MockLectureRepository : LectureRepository {
        override fun get(): List<Lecture> = listOf(lecture)

        override fun getMetas(): List<LectureEntityMeta> = listOf(lectureEntityMeta)

        override fun get(lectureId: String): Lecture? =
                if (lectureId == validLectureId) lecture else null

        override fun save(lecture: Lecture, lectureId: String?): String =
                if (lectureId == validLectureId) validLectureId else newLectureId
    }
}