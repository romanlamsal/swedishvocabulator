package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.annotation.JsonPropertyOrder
import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import com.fasterxml.jackson.annotation.JsonUnwrapped
import org.dizitart.no2.objects.Id

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
abstract class IndexCard<T : GrammaticalWord>(
        val german: String = "",
        var wordtype: WORDTYPE = WORDTYPE.FREE_TEXT,
        val swedish: T,
        var id: String = ""
) {
    override fun equals(other: Any?): Boolean {
        return if (other is IndexCard<*>)
            hashCode() == other.hashCode() && swedish.hashCode() == other.swedish.hashCode()
        else
            false
    }

    override fun hashCode(): Int {
        var result = german.hashCode()
        result = 31 * result + wordtype.toString().hashCode()
        result = 31 * result + swedish.hashCode()
        result = 31 * result + id.hashCode()
        return result
    }

}

class VerbCard(german: String, swedish: Verb, id: String = "") : IndexCard<Verb>(german, WORDTYPE.VERB, swedish, id)

class NounCard(german: String, swedish: Noun, id: String = "") : IndexCard<Noun>(german, WORDTYPE.NOUN, swedish, id)

class AdjectiveCard(german: String, swedish: Adjective, id: String = "") : IndexCard<Adjective>(german, WORDTYPE.ADJ, swedish, id)

class FreeTextCard(german: String = "", swedish: FreeText, id: String = "") : IndexCard<FreeText>(german, WORDTYPE.FREE_TEXT, swedish, id) {
    constructor(german: String = "", swedish: String = "", id: String = "") : this(german, FreeText(swedish), id)
}

enum class WORDTYPE {
    FREE_TEXT, VERB, NOUN, ADJ;
}