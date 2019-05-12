package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.IndexCard
import de.lamsal.vocabulator.provider.NitriteProvider
import de.lamsal.vocabulator.util.IdGenerator
import de.lamsal.vocabulator.util.UUIDGenerator
import org.dizitart.kno2.filters.eq
import org.dizitart.no2.NitriteId
import org.dizitart.no2.objects.Id
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component


@Component
class IndexCardRepositoryNitrite(
        @Autowired nitriteProvider: NitriteProvider,
        val idGenerator: IdGenerator<String> = UUIDGenerator()
) : IndexCardRepository {
    private val nitriteRepository =
            nitriteProvider.nitrite.getRepository<IndexCardEntity>(IndexCardEntity::class.java)

    override fun save(indexCard: IndexCard<*>): IndexCard<*> = indexCard.apply {
        if (indexCard.id.isBlank())
            indexCard.id = idGenerator.getRandomId()
        if (!exists(indexCard.id)) {
            nitriteRepository.insert(IndexCardEntity(indexCard))
        } else {
            nitriteRepository.update(IndexCardEntity(indexCard))
        }
    }

    private fun exists(indexCardId: String) = get(indexCardId) != null

    override fun get(id: String): IndexCard<*>? = nitriteRepository.find(IndexCard<*>::id eq id)
            .takeIf { it.size() > 0 }?.first()?.let { it.indexCard }

    private data class IndexCardEntity(@Id val id: String, val indexCard: IndexCard<*>) {
        constructor(indexCard: IndexCard<*>) : this(indexCard.id, indexCard)
    }
}