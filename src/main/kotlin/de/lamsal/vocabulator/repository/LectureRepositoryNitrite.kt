package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.entity.LectureEntityMeta
import de.lamsal.vocabulator.provider.NitriteProvider
import de.lamsal.vocabulator.util.IdGenerator
import de.lamsal.vocabulator.util.UUIDGenerator
import org.dizitart.kno2.filters.eq
import org.dizitart.no2.objects.Id
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.util.*

@Component
class LectureRepositoryNitrite(
        @Autowired nitriteProvider: NitriteProvider,
        val idGenerator: IdGenerator<String> = UUIDGenerator(),
        @Autowired val indexCardRepository: IndexCardRepository
) : LectureRepository {
    private val nitriteRepository = nitriteProvider.nitrite.getRepository<LectureEntity>(LectureEntity::class.java)

    override fun save(lecture: Lecture, lectureId: String?): String = (lectureId ?: idGenerator.getRandomId()).also {
        lecture.toEntity(it).apply {
            if (!exists(it))
                nitriteRepository.insert(this)
            else {
                nitriteRepository.update(this)
            }
        }
    }

    private fun exists(lectureId: String) = get(lectureId) != null

    override fun getMetas(): List<LectureEntityMeta> = nitriteRepository.find().map {
        LectureEntityMeta(it.id, it.name, it.description)
    }

    override fun get(): List<Lecture> = nitriteRepository.find().map {
        it.toLecture()
    }

    override fun get(lectureId: String): Lecture? = nitriteRepository.find(LectureEntity::id eq lectureId).let {
        if (it.size() == 1)
            it.first()!!.toLecture()
        else
            null
    }

    private fun LectureEntity.toLecture() = Lecture(name = name, description = description,
            indexCards = indexCardReferences.mapNotNull(indexCardRepository::get))

    private fun Lecture.toEntity(id: String) = LectureEntity(id = id, name = name, description = description,
            indexCardReferences = indexCards.map { indexCardRepository.save(it).id })

    private data class LectureEntity(
            @Id val id: String,
            val name: String,
            val description: String,
            val indexCardReferences: List<String>
    )
}