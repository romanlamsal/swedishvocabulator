package de.lamsal.vocabulator.entity

import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import javax.persistence.*
import kotlin.reflect.KClass

@Entity
@Table(name = "lecture")
data class Lecture(
        val name: String = "",
        val description: String = "",

        @OneToMany(targetEntity = IndexCard::class)
        @JoinTable(
                name = "lecture_indexcard",
                joinColumns = [JoinColumn(name = "lecture_id")],
                inverseJoinColumns = [JoinColumn(name = "index_card_id")]
        )
        var indexCards: List<IndexCard<*>> = emptyList<IndexCard<*>>(),

        @Id
        @GeneratedValue
        val id: Long = -1
)