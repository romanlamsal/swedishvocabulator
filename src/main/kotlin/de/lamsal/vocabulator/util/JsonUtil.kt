package de.lamsal.vocabulator.util

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategy

class JsonUtil : ObjectMapper() {
    init {
        propertyNamingStrategy = PropertyNamingStrategy.SNAKE_CASE
    }
}