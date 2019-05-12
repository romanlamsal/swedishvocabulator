package de.lamsal.vocabulator.service

import de.lamsal.vocabulator.entity.IndexCard
import de.lamsal.vocabulator.entity.LectureResult
import de.lamsal.vocabulator.repository.LectureResultRepository
import de.lamsal.vocabulator.util.JsonUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class LectureResultService(@Autowired val lectureResultRepository: LectureResultRepository) {

    private val mapper = JsonUtil()

    fun save(lectureResultJson: String, username: String) {
        val results = mapper.readValue(lectureResultJson, LectureResultMessage::class.java)

        results.wrong.map { lectureResultRepository.save(LectureResult(username, false, it)) }

        results.correct.map { lectureResultRepository.save(LectureResult(username, true, it)) }
    }

    data class LectureResultMessage(val wrong: List<IndexCard<*>>, val correct: List<IndexCard<*>>)
}
