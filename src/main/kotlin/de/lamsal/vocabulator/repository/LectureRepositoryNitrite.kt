package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.entity.LectureEntityMeta
import de.lamsal.vocabulator.provider.NitriteProvider
import org.dizitart.kno2.filters.eq
import org.dizitart.kno2.nitrite
import org.dizitart.no2.objects.Id
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component
class LectureRepositoryNitrite(@Autowired nitriteProvider: NitriteProvider) : LectureRepository {
    private val nitriteRepository = nitriteProvider.nitrite.
            getRepository<LectureEntity>(LectureEntity::class.java)

    override fun save(lecture: Lecture, lectureId: String?): String = (lectureId ?: UUID.randomUUID().toString()).also {
        if (!exists(it))
            nitriteRepository.insert(LectureEntity(it, lecture))
        else {
            nitriteRepository.update(LectureEntity(it, lecture))
        }
    }

    private fun exists(lectureId: String) = get(lectureId) != null

    override fun getMetas(): List<LectureEntityMeta> = nitriteRepository.find().map {
        LectureEntityMeta(it.id, it.lecture)
    }

    override fun get(): List<Lecture> = nitriteRepository.find().map { it.lecture }

    override fun get(lectureId: String): Lecture? =
            nitriteRepository.find(LectureEntity::id eq lectureId).takeIf { it.any() }?.first()?.lecture

    private data class LectureEntity(@Id val id: String, val lecture: Lecture)
}