package de.lamsal.vocabulator.util

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import com.fasterxml.jackson.module.kotlin.KotlinModule

class JsonUtil : ObjectMapper() {
    init {
        propertyNamingStrategy = PropertyNamingStrategy.SNAKE_CASE
        registerModule(KotlinModule())
    }
}