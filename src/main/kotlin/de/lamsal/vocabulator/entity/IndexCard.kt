package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import javax.persistence.*

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
@MappedSuperclass
abstract class IndexCard<T: GrammaticalWord>(
        val german: String = "",
        var wordtype: WORDTYPE,
        @Embedded
        val swedish: T,
        @Column(name = "index_card_id")
        @Id
        @GeneratedValue
        @JsonIgnore
        val id: Long = -1
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
        result = 31 * result + id.hashCode()
        return result
    }
}

@Entity
@Table(name = "verb_card")
class VerbCard(german: String, swedish: Verb) : IndexCard<Verb>(german, WORDTYPE.VERB, swedish)

@Entity
@Table(name = "noun_card")
class NounCard(german: String, swedish: Noun) : IndexCard<Noun>(german, WORDTYPE.NOUN, swedish)

@Entity
@Table(name = "adjective_card")
class AdjectiveCard(german: String, swedish: Adjective) : IndexCard<Adjective>(german, WORDTYPE.ADJ, swedish)

@Entity
@Table(name = "free_text_card")
class FreeTextCard(german: String, swedish: FreeText) : IndexCard<FreeText>(german, WORDTYPE.FREE_TEXT, swedish)


enum class WORDTYPE {
    FREE_TEXT, VERB, NOUN, ADJ;
}
