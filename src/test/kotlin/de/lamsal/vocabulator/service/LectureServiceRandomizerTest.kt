package de.lamsal.vocabulator.service

import de.lamsal.vocabulator.entity.FreeTextCard
import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.entity.LectureEntityMeta
import de.lamsal.vocabulator.repository.LectureRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class LectureServiceRandomizerTest {
    lateinit var lectureService: LectureService

    @Test
    fun `Test randomized Lecture with popped empty lectures and no duplicates`() {
        lectureService = LectureService(MockRandomizerLectureRepository())
        val expectedIndexCards = listOf(0, 8, 9, 7, 15, 13, 11, 1, 19, 14).map { FreeTextCard("$it", "$it") }

        val actual = lectureService.getRandomizedLecture(10, 0)

        Assertions.assertEquals(Lecture("Snack", "Size: 10, seed: 0", expectedIndexCards), actual)
    }

    inner class MockRandomizerLectureRepository : LectureRepository {
        override fun save(lecture: Lecture, lectureId: String?) = ""

        override fun getMetas(): List<LectureEntityMeta> = emptyList()

        override fun get(): List<Lecture> = (0 until 20).map {
            Lecture("", "", listOf(FreeTextCard("$it", "$it")))
        }

        override fun get(lectureId: String): Lecture? = null
    }
}