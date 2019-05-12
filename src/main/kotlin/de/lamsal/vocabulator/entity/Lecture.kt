package de.lamsal.vocabulator.entity

data class Lecture (
        val name: String = "",
        val description: String = "",

        val indexCards: List<IndexCard<*>> = emptyList()
)

data class LectureEntityMeta(val id: String, val name: String, val description: String) {
    constructor(id: String, lecture: Lecture) :
            this(name = lecture.name, description = lecture.description, id = id)
}
