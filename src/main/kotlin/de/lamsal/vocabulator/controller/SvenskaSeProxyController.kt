package de.lamsal.vocabulator.controller

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.net.URL

@RestController
class SvenskaSeProxyController {

    @GetMapping("/svenskase")
    @CrossOrigin
    fun proxySvenskaSe(@RequestParam("sok") query: String): String {
        val message = URL("https://svenska.se/tri/f_saol.php?sok=$query").readText()

        return message
    }
}