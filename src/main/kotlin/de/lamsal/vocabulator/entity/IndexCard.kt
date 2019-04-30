package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import javax.persistence.*

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        visible = true,
        property = "wordtype")
@JsonSubTypes(value = [
    JsonSubTypes.Type(value = VerbCard::class, name = "VERB"),
    JsonSubTypes.Type(value = AdjectiveCard::class, name = "ADJ"),
    JsonSubTypes.Type(value = NounCard::class, name = "NOUN"),
    JsonSubTypes.Type(value = FreeTextCard::class, name = "FREE_TEXT")
])
@Entity
@Inheritance
abstract class IndexCard(
        val german: String = "",
        var wordtype: WORDTYPE = WORDTYPE.FREE_TEXT,
        @Column(name = "index_card_id")
        @Id
        @GeneratedValue
        @JsonIgnore
        val id: Long = -1
) {
    override fun equals(other: Any?): Boolean {
        return super.equals(other)
    }
}

@Entity
@Table(name = "verb_card")
class VerbCard(german: String, val swedish: Verb) : IndexCard(german, WORDTYPE.VERB)

@Entity
@Table(name = "noun_card")
class NounCard(german: String, val swedish: Noun) : IndexCard(german, WORDTYPE.NOUN)

@Entity
@Table(name = "adjective_card")
class AdjectiveCard(german: String, val swedish: Adjective) : IndexCard(german, WORDTYPE.ADJ)

@Entity
@Table(name = "free_text_card")
class FreeTextCard(german: String, val swedish: FreeText) : IndexCard(german, WORDTYPE.FREE_TEXT)


enum class WORDTYPE {
    FREE_TEXT, VERB, NOUN, ADJ;
}
