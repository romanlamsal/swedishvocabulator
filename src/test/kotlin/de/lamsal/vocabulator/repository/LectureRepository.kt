package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@SpringBootTest
internal class LectureRepositoryTestIT {

    @Autowired
    lateinit var indexCardRepository: IndexCardRepository

    @Autowired
    lateinit var lectureRepository: LectureRepository

    @Test
    fun `can save empty lecture`() {
        lectureRepository.save(Lecture())
    }

    @Test
    fun `can save lecture with cards, on which the cards will be lost`() {
        val indexCards = listOf(
                IndexCard<FreeText>("hallo i bims", WORDTYPE.FREE_TEXT, FreeText("hey, är jag"))
        )

        val lecture = Lecture(name = "foo", description = "bar", indexCards = indexCards.map { indexCardRepository.save(it) })
        val savedLecture = lectureRepository.save(lecture)

        assertNotEquals(lecture.indexCards, savedLecture.indexCards)
    }
}