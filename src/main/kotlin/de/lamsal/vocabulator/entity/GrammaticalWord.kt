package de.lamsal.vocabulator.entity

import javax.persistence.Entity
import javax.persistence.Id

interface GrammaticalWord

@Entity
data class Verb(
        @Id
        val infinitive: String = "",
        val preterite: String = "",
        val imperative: String = "",
        val presentTense: String = "",
        val supinum: String = ""
) : GrammaticalWord

@Entity
data class Adjective(
        @Id
        val singularDefinite: String = "",
        val singularUtrumIndefinite: String = "",
        val singularNeutrumIndefinite: String = "",
        val plural: String = "",
        val comparative: String = "",
        val superlative: String = ""
) : GrammaticalWord

@Entity
data class Noun(
        @Id
        val singularDefinite: String = "",
        val singularIndefinite: String = "",
        val _noun_type: String = "",
        val pluralDefinite: String = "",
        val pluralIndefinite: String = ""
) : GrammaticalWord

@Entity
data class FreeText(@Id val value: String = "") : GrammaticalWord