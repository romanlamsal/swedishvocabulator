package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.IndexCard

interface IndexCardRepository {
    fun save(indexCard: IndexCard<*>): IndexCard<*>

    fun get(id: String): IndexCard<*>?
}

