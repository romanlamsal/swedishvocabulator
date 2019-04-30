package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.*
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface IndexCardRepository : CrudRepository<IndexCard<*>, Long>

@Repository
interface VerbCardRepository : CrudRepository<VerbCard, Long>

@Repository
interface NounCardCardRepository : CrudRepository<NounCard, Long>

@Repository
interface AdjectiveCardRepository : CrudRepository<AdjectiveCard, Long>

@Repository
interface FreeTextCardRepository : CrudRepository<FreeTextCard, Long>