package de.lamsal.vocabulator

import de.lamsal.vocabulator.entity.*

const val VERB_JSON = """{
  "german" : "schließen",
  "wordtype" : "VERB",
  "swedish" : {
    "infinitive" : "stänga",
    "preterite" : "stängde",
    "imperative" : "stäng",
    "present_tense" : "stänger",
    "supinum" : "stängt"
  }
}"""

const val NOUN_JSON = """{
  "german" : "Raum",
  "wordtype" : "NOUN",
  "swedish" : {
    "singular_definite" : "rummet",
    "singular_indefinite" : "rum",
    "noun_type" : "ett",
    "plural_definite" : "rummen",
    "plural_indefinite" : "rum"
  }
}"""

const val ADJECTIVE_JSON = """{
  "german" : "fett",
  "wordtype" : "ADJ",
  "swedish" : {
    "singular_definite" : "tjusiga",
    "singular_utrum_indefinite" : "tjusig",
    "singular_neutrum_indefinite" : "tjusigt",
    "plural" : "tjusiga",
    "comparative" : "tjusigare",
    "superlative" : "tjusigast"
  }
}"""

const val FREE_TEXT_JSON = """{
  "german" : "Erst mal nur ein Satz",
  "wordtype" : "FREE_TEXT",
  "swedish" : {
    "value" : "Enda en mening."
  }
}"""

val VERB_CARD = VerbCard("schließen", Verb(
        "stänga", "stängde", "stäng", "stänger", "stängt"
))

val NOUN_CARD = NounCard("Raum", Noun(
        "rummet", "rum", "ett", "rummen", "rum"
))

val ADJECTIVE_CARD = AdjectiveCard("fett", Adjective(
        "tjusiga", "tjusig", "tjusigt", "tjusiga", "tjusigare", "tjusigast"
))

val FREE_TEXT_CARD = FreeTextCard("Erst mal nur ein Satz", FreeText(
        "Enda en mening."
))

val LECTURE = Lecture("Unit Testing", "Example lecture for unit tests in the backend.", listOf(
        FREE_TEXT_CARD, VERB_CARD, NOUN_CARD, ADJECTIVE_CARD, FreeTextCard(german = "", swedish = FreeText(""))
))