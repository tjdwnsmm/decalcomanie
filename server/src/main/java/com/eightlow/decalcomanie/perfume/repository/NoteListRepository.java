package com.eightlow.decalcomanie.perfume.repository;

import com.eightlow.decalcomanie.perfume.entity.Note;
import com.eightlow.decalcomanie.perfume.entity.NoteList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteListRepository extends JpaRepository<NoteList, Integer> {
    List<NoteList> findAll();

    Note findOneByNote_NoteId(int noteListId);

    List<NoteList> findAllByPerfume_PerfumeId(int perfumeId);
}
