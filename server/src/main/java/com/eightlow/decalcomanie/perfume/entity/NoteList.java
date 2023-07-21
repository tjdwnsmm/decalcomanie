package com.eightlow.decalcomanie.perfume.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
//@Table(indexes = @Index(name = "idx_actor", columnList = "docId"))
public class NoteList {

    @Id
    @Column(name = "noteListId")
    private int noteListId;

    @Column(name = "perfumeId")
    private int perfumeId;

    @Column(name = "type")
    private String type;

    @Column(name = "noteId")
    private String noteId;

}
