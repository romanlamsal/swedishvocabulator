package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.FreeTextCard
import de.lamsal.vocabulator.entity.IndexCard
import de.lamsal.vocabulator.provider.NitriteProvider
import de.lamsal.vocabulator.util.IdGenerator
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

internal class IndexCardRepositoryNitriteTest {
    private companion object {
        const val randomId = "random_id"
        const val fixedId = "fixed_id"
        val indexCard = FreeTextCard("", "")
        val indexCardWithId = FreeTextCard("", "", fixedId)
        val indexCardWithRandomId = FreeTextCard("", "", randomId)
    }

    lateinit var indexCardRepository: IndexCardRepository

    @BeforeEach
    fun setup() {
        indexCardRepository = IndexCardRepositoryNitrite(NitriteProvider(), StaticIdGenerator())
    }

    @Test
    fun `generates id on save, when no id was provided`() {
        val savedCard = indexCardRepository.save(indexCard)
        assertEquals(randomId, savedCard.id)
    }

    @Test
    fun `generates NO id on save, when id is provided`() {
        val savedCard = indexCardRepository.save(indexCardWithId)
        assertEquals(fixedId, savedCard.id)
    }

    @Test
    fun `can save card without ID and fetch card again`() {
        indexCardRepository.save(indexCard)
        assertEquals(indexCardWithRandomId, indexCardRepository.get(randomId))
    }

    @Test
    fun `can save card with ID and fetch card again`() {
        indexCardRepository.save(indexCardWithId)
        assertEquals(indexCardWithId, indexCardRepository.get(fixedId))
    }

    @Test
    fun `can save same card multiple times`() {
        indexCardRepository.save(indexCardWithId)
        indexCardRepository.save(indexCardWithId)
    }

    inner class StaticIdGenerator : IdGenerator<String> {
        override fun getRandomId(): String = randomId

    }
}