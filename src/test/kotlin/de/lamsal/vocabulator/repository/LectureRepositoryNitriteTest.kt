package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.FreeTextCard
import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.entity.LectureEntityMeta
import de.lamsal.vocabulator.provider.NitriteProvider
import de.lamsal.vocabulator.util.IdGenerator
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

internal class LectureRepositoryNitriteTest {
    private companion object {
        const val lectureId = "lectureId"
        const val indexCardId = "indexCardId"
        private val lectureBeforeSave: Lecture
            get() = Lecture("name", "description", listOf(FreeTextCard("german", "swedish")))
        private val lectureAfterSave: Lecture
            get () = Lecture("name", "description", listOf(FreeTextCard("german", "swedish", indexCardId)))
    }

    inner class FixedValIdGenerator(private val id: String) : IdGenerator<String> {
        override fun getRandomId(): String = id

    }

    private lateinit var nitriteProvider: NitriteProvider
    private lateinit var lectureRepositoryNitrite: LectureRepositoryNitrite

    @BeforeEach
    fun setup() {
        nitriteProvider = NitriteProvider()
        lectureRepositoryNitrite = LectureRepositoryNitrite(
                nitriteProvider = nitriteProvider,
                indexCardRepository = IndexCardRepositoryNitrite(nitriteProvider, FixedValIdGenerator(indexCardId)),
                idGenerator = FixedValIdGenerator(lectureId)
        )
    }

    @AfterEach
    fun teardown() {
        nitriteProvider.nitrite.close()
    }

    @Test
    fun `can save without ID`() {
        lectureRepositoryNitrite.save(lectureBeforeSave, null)
        assertEquals(lectureAfterSave, lectureRepositoryNitrite.get(lectureId))
    }

    @Test
    fun `can save with ID`() {
        assertEquals(lectureId, lectureRepositoryNitrite.save(lectureBeforeSave, lectureId))
        assertEquals(lectureAfterSave, lectureRepositoryNitrite.get(lectureId))
    }

    @Test
    fun `can save multiple times with the same ID`() {
        lectureRepositoryNitrite.save(lectureBeforeSave, lectureId)

        val editedLecture = Lecture("edited name", lectureAfterSave.description, lectureAfterSave.indexCards)
        lectureRepositoryNitrite.save(editedLecture, lectureId)

        assertEquals(editedLecture, lectureRepositoryNitrite.get(lectureId))
    }

    @Test
    fun `fetch all lectures at once`() {
        val firstLectureId = "${lectureId}_0"
        val secondLectureId = "${lectureId}_1"
        lectureRepositoryNitrite.save(lectureBeforeSave, firstLectureId)
        lectureRepositoryNitrite.save(lectureBeforeSave, secondLectureId)

        assertEquals(listOf(
                LectureEntityMeta(firstLectureId, lectureBeforeSave.name, lectureBeforeSave.description),
                LectureEntityMeta(secondLectureId, lectureBeforeSave.name, lectureBeforeSave.description)
        ), lectureRepositoryNitrite.getMetas())
    }
}