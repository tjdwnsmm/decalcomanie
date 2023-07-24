package com.eightlow.decalcomanie.perfume.dto;

import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class NoteDto {
    private int noteId;

    private String name;
}
