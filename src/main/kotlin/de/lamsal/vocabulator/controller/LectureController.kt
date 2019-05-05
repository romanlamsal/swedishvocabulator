package de.lamsal.vocabulator.controller

import com.fasterxml.jackson.databind.ObjectMapper
import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.entity.LectureEntityMeta
import de.lamsal.vocabulator.service.LectureService
import de.lamsal.vocabulator.util.JsonUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/lecture")
class LectureController(@Autowired val lectureService: LectureService) {

    private val mapper = JsonUtil()

    @CrossOrigin
    @PostMapping("/{id}", "/")
    fun saveLecture(@RequestBody dataJson: String, @PathVariable id: String?): String {
        return lectureService.saveLecture(dataJson, id)
    }

    @CrossOrigin
    @GetMapping("/")
    fun getAllLectures(): String {
        return mapper.writeValueAsString(lectureService.getLectures())
    }

    @CrossOrigin
    @GetMapping("/{id}")
    fun getLecture(@PathVariable id: String): String {
        return mapper.writeValueAsString(lectureService.getLecture(id)!!)
    }

    @CrossOrigin
    @GetMapping("/snack")
    fun getRandomizedLecture(@RequestParam(required = false, defaultValue = "20") size: Int): String {
        return mapper.writeValueAsString(lectureService.getRandomizedLecture(size))
    }
}