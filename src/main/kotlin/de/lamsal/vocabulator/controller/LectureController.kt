package de.lamsal.vocabulator.controller

import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.service.LectureService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/lecture")
class LectureController(@Autowired val lectureService: LectureService) {

    @PostMapping("/")
    fun saveLecture(@RequestBody dataJson: String) {
        lectureService.saveLecture(dataJson)
    }

    @GetMapping("/")
    fun getAllLectures(): List<Lecture> {
        return lectureService.getLectures()
    }

    @GetMapping("/{id")
    fun getLecture(@PathVariable id: Long): Lecture {
        return lectureService.getLecture(id)
    }
}