package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.annotation.JsonPropertyOrder
import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        visible = true,
        property = "wordtype")
@JsonSubTypes(value = [
    JsonSubTypes.Type(value = VerbCard::class, name = "VERB"),
    JsonSubTypes.Type(value = AdjectiveCard::class, name = "ADJ"),
    JsonSubTypes.Type(value = NounCard::class, name = "NOUN"),
    JsonSubTypes.Type(value = FreeTextCard::class, name = "FREE_TEXT")
])
@JsonPropertyOrder("german", "wordtype", "swedish")
abstract class IndexCard<T: GrammaticalWord>(
        val german: String = "",
        var wordtype: WORDTYPE = WORDTYPE.FREE_TEXT,
        val swedish: T
) {
    override fun equals(other: Any?): Boolean {
        return if (other is IndexCard<*>)
            hashCode() == other.hashCode() && swedish.hashCode() == other.swedish.hashCode()
        else
            false
    }

    override fun hashCode(): Int {
        var result = german.hashCode()
        result = 31 * result + wordtype.hashCode()
        return result
    }
}

class VerbCard(german: String, swedish: Verb) : IndexCard<Verb>(german, WORDTYPE.VERB, swedish)

class NounCard(german: String, swedish: Noun) : IndexCard<Noun>(german, WORDTYPE.NOUN, swedish)

class AdjectiveCard(german: String, swedish: Adjective) : IndexCard<Adjective>(german, WORDTYPE.ADJ, swedish)

class FreeTextCard(german: String = "", swedish: FreeText) : IndexCard<FreeText>(german, WORDTYPE.FREE_TEXT, swedish) {
    constructor(german: String = "", swedish: String = "") : this(german, FreeText(swedish))
}

enum class WORDTYPE {
    FREE_TEXT, VERB, NOUN, ADJ;
}
