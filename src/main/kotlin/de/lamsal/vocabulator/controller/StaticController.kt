package de.lamsal.vocabulator.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class StaticController {

    @GetMapping("/lecture/**", "/quiz/**")
    fun index() = "/index.html"
}