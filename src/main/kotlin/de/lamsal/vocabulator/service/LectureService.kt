package de.lamsal.vocabulator.service

import de.lamsal.vocabulator.entity.IndexCard
import de.lamsal.vocabulator.entity.Lecture
import de.lamsal.vocabulator.entity.LectureEntityMeta
import de.lamsal.vocabulator.repository.LectureRepository
import de.lamsal.vocabulator.util.JsonUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class LectureService(
        @Autowired val lectureRepository: LectureRepository
) {
    private val mapper = JsonUtil()

    fun saveLecture(dataJson: String, lectureId: String?): String {
        val lecture = mapper.readValue(dataJson, Lecture::class.java)
        return lectureRepository.save(lecture, lectureId)
    }

    fun getLectures(): List<LectureEntityMeta> = lectureRepository.getMetas()

    fun getLecture(lectureId: String): Lecture? = lectureRepository.get(lectureId)

    fun getRandomizedLecture(size: Int, seed: Long = Date().time): Lecture {
        val random = Random(seed)
        val allLectures = lectureRepository.get().map { it.indexCards.toMutableList() }
        return Lecture("Snack", "Size: $size, seed: $seed",
                emptyList<IndexCard<*>>().toMutableList().apply {
                    do (
                        allLectures[random.nextInt(allLectures.size)].let {
                            if (it.size > 1)
                                this.add(it.removeAt(random.nextInt(it.size)))
                            if (it.size == 1)
                                this.add(it[0])
                        }
                    ) while (this.size != size)
                })
    }
}