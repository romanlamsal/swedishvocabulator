package de.lamsal.vocabulator

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class VocabulatorApplication

fun main(args: Array<String>) {
	runApplication<VocabulatorApplication>(*args)
}
