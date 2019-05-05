package de.lamsal.vocabulator.entity

data class Lecture (
        val name: String = "",
        val description: String = "",

        val indexCards: List<IndexCard<*>> = emptyList()
)

data class LectureEntityMeta(val name: String, val description: String, val id: String) {
    constructor(id: String, lecture: Lecture) :
            this(lecture.name, lecture.description, id)
}