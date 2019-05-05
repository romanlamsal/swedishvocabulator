package de.lamsal.vocabulator.provider

import org.dizitart.kno2.nitrite
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class NitriteProvider(@Value("\${nitrite.filepath}") filepath: String? = null) {
    val nitrite = nitrite {
        if (!filepath.isNullOrEmpty()) {
            path = filepath
        }
    }
}