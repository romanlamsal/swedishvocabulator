package de.lamsal.vocabulator.controller

import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.core.annotation.Order
import org.springframework.test.context.TestPropertySource

@SpringBootTest
@TestPropertySource(properties = ["nitrite.filepath="])
//@TestMethodOrder(MethodOrderer.OrderAnnotation::class)
class LectureControllerTestIT {

    private companion object {
        const val unsavedLectureJson = """{"name":"TestLectureName","description":"TestLectureDescription","index_cards":[{"german":"schließen","wordtype":"VERB","swedish":{"present_tense":"stänger","preterite":"stängde","imperative":"stäng","infinitive":"stänga","supinum":"stängt"}},{"german":"geschlossen","wordtype":"ADJ","swedish":{"singular_utrum_indefinite":"stängd","singular_neutrum_indefinite":"stängt","plural":"stängda","singular_definite":"stängda","comparative":"","superlative":""}}]}"""
        const val savedLectureJson = """{"name":"TestLectureName","description":"TestLectureDescription","index_cards":[{"german":"schließen","wordtype":"VERB","swedish":{"infinitive":"stänga","preterite":"stängde","imperative":"stäng","present_tense":"stänger","supinum":"stängt"},"id":"REPLACE_UUID"},{"german":"geschlossen","wordtype":"ADJ","swedish":{"singular_definite":"stängda","singular_utrum_indefinite":"stängd","singular_neutrum_indefinite":"stängt","plural":"stängda","comparative":"","superlative":""},"id":"REPLACE_UUID"}]}"""

        var lectureId: String = ""
        const val editedLectureName = "TestLectureNameEdited"
    }

    private fun String.uuidToRegex() = replace("{", "\\{")
            .replace("[", "\\[")
            .replace("REPLACE_UUID", "[\\w-]+").toRegex()

    @Autowired lateinit var lectureController: LectureController

    @Test
    @Order(1)
    fun `save a lecture from json`() {
        lectureId = lectureController.saveLecture(unsavedLectureJson, null)
        assertNotEquals("", lectureId)
    }

    @Test
    @Order(2)
    fun `fetch lecture again by id, has indexCards with ids`() {
        assertTrue(savedLectureJson.uuidToRegex().matches(lectureController.getLecture(lectureId)))
    }

    @Test
    @Order(3)
    fun `fetch previously saved lecture, change name, save again`() {
        // save the same lecture with the same id but different name
        val lectureJsonWithEditedName = lectureController.getLecture(lectureId)
                .replace("TestLectureName", editedLectureName)

        assertEquals(lectureId, lectureController.saveLecture(lectureJsonWithEditedName, lectureId))

        // name is also updated after fetch, save is successful
        val fetchedUpdatedLecture = lectureController.getLecture(lectureId)
        assertTrue(savedLectureJson.replace("TestLectureName", editedLectureName).uuidToRegex().matches(fetchedUpdatedLecture))
    }
}
