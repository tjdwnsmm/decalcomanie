package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.NoteDto;
import com.eightlow.decalcomanie.perfume.entity.Note;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoteMapper {
    Note toEntity(NoteDto noteDto);

    NoteDto toDto(Note note);

    List<Note> toEntity(List<NoteDto> noteDtoList);

    List<NoteDto> toDto(List<Note> noteList);
}
