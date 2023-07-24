package com.eightlow.decalcomanie.perfume.dto;

import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class NoteListDto {
    private int noteListId;

    private int perfumeId;

    private String type;

    private int noteId;

    private String noteName;
}

