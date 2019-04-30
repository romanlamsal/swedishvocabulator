package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.FreeText
import de.lamsal.vocabulator.entity.FreeTextCard
import de.lamsal.vocabulator.entity.IndexCard
import de.lamsal.vocabulator.entity.Lecture
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
    lateinit var lectureRepository: LectureRepository

    @Test
    fun `can save empty lecture`() {
        lectureRepository.save(Lecture())
    }

    @Test
    fun `can save lecture with cards, on which the cards will be lost`() {
        val lecture = Lecture(name = "foo", description = "bar", indexCards = listOf(
                FreeTextCard("hallo i bims", FreeText("hey, är jag"))
        ))
        val savedLecture = lectureRepository.save(lecture)

        assertNotEquals(lecture.indexCards, savedLecture.indexCards)
    }
}