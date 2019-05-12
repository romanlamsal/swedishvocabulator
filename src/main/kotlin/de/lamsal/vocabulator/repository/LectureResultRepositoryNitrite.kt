package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.LectureResult
import de.lamsal.vocabulator.provider.NitriteProvider
import de.lamsal.vocabulator.util.IdGenerator
import de.lamsal.vocabulator.util.UUIDGenerator
import org.dizitart.no2.objects.Id
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.util.*

@Component
class LectureResultRepositoryNitrite(
        @Autowired nitriteProvider: NitriteProvider,
        val idGenerator: IdGenerator<String> = UUIDGenerator()
) : LectureResultRepository {

    private val nitriteRepository =
            nitriteProvider.nitrite.getRepository<LectureResultEntity>(LectureResultEntity::class.java)

    override fun save(lectureResult: LectureResult) {
        nitriteRepository.insert(LectureResultEntity(idGenerator.getRandomId(), lectureResult))
    }

    private data class LectureResultEntity(
            @Id val id: String,
            val username: String,
            val correct: Boolean,
            val indexCardId: String) {
        val timestamp = Date()

        constructor(id: String, lectureResult: LectureResult) :
                this(id, lectureResult.username, lectureResult.correct, lectureResult.indexCard.id)
    }
}