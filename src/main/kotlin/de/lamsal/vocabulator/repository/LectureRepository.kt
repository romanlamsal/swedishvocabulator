package de.lamsal.vocabulator.repository

import de.lamsal.vocabulator.entity.Lecture
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface LectureRepository : CrudRepository<Lecture, Long>