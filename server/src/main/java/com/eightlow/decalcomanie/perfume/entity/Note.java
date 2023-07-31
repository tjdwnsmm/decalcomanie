package com.eightlow.decalcomanie.perfume.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Builder(toBuilder = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Note {

    @Id
    @Column(name = "noteId")
    private int noteId;

    @Column(name = "nameOrg")
    private String nameOrg;

    @Column(name = "name")
    private String name;

}
