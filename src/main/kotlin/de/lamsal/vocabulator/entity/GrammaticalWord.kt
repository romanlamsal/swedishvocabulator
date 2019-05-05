package de.lamsal.vocabulator.entity

interface GrammaticalWord

data class Verb(
        val infinitive: String = "",
        val preterite: String = "",
        val imperative: String = "",
        val presentTense: String = "",
        val supinum: String = ""
) : GrammaticalWord

data class Adjective(
        val singularDefinite: String = "",
        val singularUtrumIndefinite: String = "",
        val singularNeutrumIndefinite: String = "",
        val plural: String = "",
        val comparative: String = "",
        val superlative: String = ""
) : GrammaticalWord

data class Noun(
        val singularDefinite: String = "",
        val singularIndefinite: String = "",
        val noun_type: String = "",
        val pluralDefinite: String = "",
        val pluralIndefinite: String = ""
) : GrammaticalWord

data class FreeText(val value: String = "") : GrammaticalWord