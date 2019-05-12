package de.lamsal.vocabulator.controller

import de.lamsal.vocabulator.service.LectureResultService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest


@RestController
@RequestMapping("/api/result")
class LectureResultController(@Autowired val lectureResultService: LectureResultService) {

    @PostMapping("/")
    fun saveResult(@RequestBody dataJson: String, httpServletRequest: HttpServletRequest) {
        lectureResultService.save(dataJson, httpServletRequest.remoteUser)
    }
}