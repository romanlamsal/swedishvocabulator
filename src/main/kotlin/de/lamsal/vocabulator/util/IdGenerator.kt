package de.lamsal.vocabulator.util

import org.springframework.stereotype.Component
import java.util.*

interface IdGenerator<T> {
    fun getRandomId(): T
}

@Component
class UUIDGenerator : IdGenerator<String> {
    override fun getRandomId(): String = UUID.randomUUID().toString()
}