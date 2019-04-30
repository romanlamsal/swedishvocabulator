package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import javax.persistence.*
import kotlin.reflect.KClass

@Entity
@Table(name = "lecture")
data class Lecture(
        val name: String = "",
        val description: String = "",


        @JsonDeserialize(contentAs = IndexCard::class)
        @JoinTable(
                name = "lecture_indexcard",
                joinColumns = [JoinColumn(name = "lecture_id")],
                inverseJoinColumns = [JoinColumn(name = "index_card_id")]
        )
        @OneToMany(targetEntity = IndexCard::class)
        var indexCards: MutableList<IndexCard> = emptyList<IndexCard>().toMutableList(),
        @Id
        @GeneratedValue
        val id: Long = -1
)