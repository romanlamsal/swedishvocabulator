package de.lamsal.vocabulator.entity

import javax.persistence.Embeddable

interface GrammaticalWord

@Embeddable
data class Verb(
        val infinitive: String = "",
        val preterite: String = "",
        val imperative: String = "",
        val presentTense: String = "",
        val supinum: String = ""
) : GrammaticalWord

@Embeddable
data class Adjective(
        val singularDefinite: String = "",
        val singularUtrumIndefinite: String = "",
        val singularNeutrumIndefinite: String = "",
        val plural: String = "",
        val comparative: String = "",
        val superlative: String = ""
) : GrammaticalWord

@Embeddable
data class Noun(
        val singularDefinite: String = "",
        val singularIndefinite: String = "",
        val _noun_type: String = "",
        val pluralDefinite: String = "",
        val pluralIndefinite: String = ""
) : GrammaticalWord

@Embeddable
data class FreeText(val value: String = "") : GrammaticalWord