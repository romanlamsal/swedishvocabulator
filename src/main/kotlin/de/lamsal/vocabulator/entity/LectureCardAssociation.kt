package de.lamsal.vocabulator.entity

import java.io.Serializable
import javax.persistence.Embeddable
import javax.persistence.Embedded
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class LectureCardAssociation(lectureId: Long, cardId: Long, wordtype: WORDTYPE) {

    @Embedded
    @Id
    val id: LectureCardAssociationId = LectureCardAssociationId(lectureId, cardId, wordtype)
}

@Embeddable
data class LectureCardAssociationId(val lectureId: Long, val cardId: Long, val wordtype: WORDTYPE) : Serializable