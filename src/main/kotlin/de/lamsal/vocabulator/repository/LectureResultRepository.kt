package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.LectureResult

interface LectureResultRepository {
    fun save(lectureResult: LectureResult)
}