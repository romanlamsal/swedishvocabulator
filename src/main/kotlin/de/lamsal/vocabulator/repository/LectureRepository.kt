package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.entity.LectureEntityMeta
import org.springframework.stereotype.Component

@Component
interface LectureRepository {
    fun save(lecture: Lecture, lectureId: String?): String
    fun getMetas(): List<LectureEntityMeta>
    fun get(): List<Lecture>
    fun get(lectureId: String): Lecture?
}