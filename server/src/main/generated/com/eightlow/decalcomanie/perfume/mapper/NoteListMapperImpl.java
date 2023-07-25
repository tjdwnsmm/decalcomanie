package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.NoteListDto;
import com.eightlow.decalcomanie.perfume.entity.NoteList;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-25T11:09:54+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class NoteListMapperImpl implements NoteListMapper {

    @Override
    public NoteList toEntity(NoteListDto noteListDto) {
        if ( noteListDto == null ) {
            return null;
        }

        NoteList.NoteListBuilder noteList = NoteList.builder();

        noteList.noteListId( noteListDto.getNoteListId() );
        noteList.perfumeId( noteListDto.getPerfumeId() );
        noteList.type( noteListDto.getType() );
        noteList.noteId( noteListDto.getNoteId() );

        return noteList.build();
    }

    @Override
    public NoteListDto toDto(NoteList noteList) {
        if ( noteList == null ) {
            return null;
        }

        NoteListDto.NoteListDtoBuilder noteListDto = NoteListDto.builder();

        noteListDto.noteListId( noteList.getNoteListId() );
        noteListDto.perfumeId( noteList.getPerfumeId() );
        noteListDto.type( noteList.getType() );
        noteListDto.noteId( noteList.getNoteId() );

        return noteListDto.build();
    }

    @Override
    public List<NoteList> toEntity(List<NoteListDto> noteListDtoList) {
        if ( noteListDtoList == null ) {
            return null;
        }

        List<NoteList> list = new ArrayList<NoteList>( noteListDtoList.size() );
        for ( NoteListDto noteListDto : noteListDtoList ) {
            list.add( toEntity( noteListDto ) );
        }

        return list;
    }

    @Override
    public List<NoteListDto> toDto(List<NoteList> noteListList) {
        if ( noteListList == null ) {
            return null;
        }

        List<NoteListDto> list = new ArrayList<NoteListDto>( noteListList.size() );
        for ( NoteList noteList : noteListList ) {
            list.add( toDto( noteList ) );
        }

        return list;
    }
}
