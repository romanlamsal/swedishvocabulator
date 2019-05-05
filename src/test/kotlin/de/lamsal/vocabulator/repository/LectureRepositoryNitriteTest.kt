package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.FreeTextCard
import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.entity.LectureEntityMeta
import de.lamsal.vocabulator.provider.NitriteProvider
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.io.File
import java.nio.file.Files

internal class LectureRepositoryNitriteTest {
    private companion object {
        val lecture = Lecture("name", "description", listOf(FreeTextCard("german","swedish")))
        const val lectureId = "lectureId"
    }

    private lateinit var nitriteFile: File
    private lateinit var nitriteProvider: NitriteProvider
    private lateinit var lectureRepositoryNitrite: LectureRepositoryNitrite

    @BeforeEach
    fun setup() {
        // filebased testing
        nitriteFile = File.createTempFile("nitrite_test_", ".db")
        nitriteProvider = NitriteProvider(nitriteFile.absolutePath)
        lectureRepositoryNitrite = LectureRepositoryNitrite(nitriteProvider)
    }

    @AfterEach
    fun teardown() {
        nitriteProvider.nitrite.close()
        Files.delete(nitriteFile.toPath())
    }

    @Test
    fun `can save without ID`() {
        val generatedId = lectureRepositoryNitrite.save(lecture, null)
        assertEquals(lecture, lectureRepositoryNitrite.get(generatedId))
    }

    @Test
    fun `can save with ID`() {
        assertEquals(lectureId, lectureRepositoryNitrite.save(lecture, lectureId))
        assertEquals(lecture, lectureRepositoryNitrite.get(lectureId))
    }

    @Test
    fun `can save multiple times with the same ID`() {
        lectureRepositoryNitrite.save(lecture, lectureId)

        val editedLecture = Lecture("name got edited", lecture.description, lecture.indexCards)
        lectureRepositoryNitrite.save(editedLecture, lectureId)
        assertEquals(editedLecture, lectureRepositoryNitrite.get(lectureId))
    }

    @Test
    fun `fetch all lectures at once`() {
        val firstLectureId = "${lectureId}_0"
        val secondLectureId = "${lectureId}_1"
        lectureRepositoryNitrite.save(lecture, firstLectureId)
        lectureRepositoryNitrite.save(lecture, secondLectureId)
        assertEquals(listOf(LectureEntityMeta(firstLectureId, lecture), LectureEntityMeta(secondLectureId, lecture)),
                lectureRepositoryNitrite.getMetas())
    }
}