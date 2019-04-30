package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.Adjective
import de.lamsal.vocabulator.entity.FreeText
import de.lamsal.vocabulator.entity.Noun
import de.lamsal.vocabulator.entity.Verb
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

//@Repository
interface AdjectiveRepository : CrudRepository<Adjective, String>

//@Repository
interface VerbRepository : CrudRepository<Verb, String>

//@Repository
interface NounRepository : CrudRepository<Noun, String>

//@Repository
interface FreeTextRepository : CrudRepository<FreeText, String>