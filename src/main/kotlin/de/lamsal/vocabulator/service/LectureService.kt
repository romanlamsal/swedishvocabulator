package de.lamsal.vocabulator.service

import com.fasterxml.jackson.module.kotlin.readValue
import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.repository.LectureRepository
import de.lamsal.vocabulator.util.JsonUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class LectureService(
        @Autowired val lectureRepository: LectureRepository
) {
    private val mapper = JsonUtil()

    fun saveLecture(dataJson: String) {
        lectureRepository.save(mapper.readValue(dataJson))
    }

    fun getLectures(): List<Lecture> = lectureRepository.findAll().toList()

    fun getLecture(id: Long): Lecture = lectureRepository.findById(id).get()
}