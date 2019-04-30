package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.LectureCardAssociation
import de.lamsal.vocabulator.entity.LectureCardAssociationId
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface LectureCardAssociationRepository : CrudRepository<LectureCardAssociation, LectureCardAssociationId> {
    fun deleteAllByLectureId(lectureId: Long)
}