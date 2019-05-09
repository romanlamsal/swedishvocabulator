package de.lamsal.vocabulator.util

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import com.fasterxml.jackson.module.kotlin.KotlinModule

class JsonUtil : ObjectMapper() {
    init {
        propertyNamingStrategy = PropertyNamingStrategy.SNAKE_CASE
        registerModule(KotlinModule())
        DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT
    }
}