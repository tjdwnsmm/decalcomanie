package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.NoteDto;
import com.eightlow.decalcomanie.perfume.entity.Note;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-25T11:09:53+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class NoteMapperImpl implements NoteMapper {

    @Override
    public Note toEntity(NoteDto noteDto) {
        if ( noteDto == null ) {
            return null;
        }

        Note.NoteBuilder note = Note.builder();

        note.noteId( noteDto.getNoteId() );
        note.name( noteDto.getName() );

        return note.build();
    }

    @Override
    public NoteDto toDto(Note note) {
        if ( note == null ) {
            return null;
        }

        NoteDto.NoteDtoBuilder noteDto = NoteDto.builder();

        noteDto.noteId( note.getNoteId() );
        noteDto.name( note.getName() );

        return noteDto.build();
    }

    @Override
    public List<Note> toEntity(List<NoteDto> noteDtoList) {
        if ( noteDtoList == null ) {
            return null;
        }

        List<Note> list = new ArrayList<Note>( noteDtoList.size() );
        for ( NoteDto noteDto : noteDtoList ) {
            list.add( toEntity( noteDto ) );
        }

        return list;
    }

    @Override
    public List<NoteDto> toDto(List<Note> noteList) {
        if ( noteList == null ) {
            return null;
        }

        List<NoteDto> list = new ArrayList<NoteDto>( noteList.size() );
        for ( Note note : noteList ) {
            list.add( toDto( note ) );
        }

        return list;
    }
}
