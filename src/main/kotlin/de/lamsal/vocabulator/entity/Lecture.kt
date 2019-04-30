package de.lamsal.vocabulator.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "lecture")
data class Lecture(
        val name: String = "",
        val description: String = "",

        @Transient
        val indexCards: List<IndexCard<*>> = emptyList(),

        @Id
        @GeneratedValue
        val id: Long = -1
)