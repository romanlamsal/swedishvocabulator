package de.lamsal.vocabulator.entity

data class LectureResult(val username: String, val correct: Boolean, val indexCard: IndexCard<*>)