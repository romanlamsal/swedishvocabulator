package de.lamsal.vocabulator.service

import com.fasterxml.jackson.module.kotlin.readValue
import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.entity.LectureCardAssociation
import de.lamsal.vocabulator.repository.LectureCardAssociationRepository
import de.lamsal.vocabulator.repository.LectureRepository
import de.lamsal.vocabulator.util.JsonUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class LectureService(
        @Autowired val indexCardRe
        @Autowired val lectureRepository: LectureRepository,
        @Autowired val lectureCardAssociationRepository: LectureCardAssociationRepository
) {
    private val mapper = JsonUtil()

    fun saveLecture(dataJson: String) = mapper.readValue(dataJson, Lecture::class.java).run {
        val savedLecture = lectureRepository.save(this)
        lectureCardAssociationRepository.deleteAllByLectureId(savedLecture.id)
        lecture
    }

    fun getLectures(): List<Lecture> = lectureRepository.findAll().toList()

    fun getLecture(id: Long): Lecture = lectureRepository.findById(id).get()
}