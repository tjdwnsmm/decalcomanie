package com.eightlow.decalcomanie.perfume.mapper;

import com.eightlow.decalcomanie.perfume.dto.NoteListDto;
import com.eightlow.decalcomanie.perfume.dto.OccasionDto;
import com.eightlow.decalcomanie.perfume.dto.PerfumeDto;
import com.eightlow.decalcomanie.perfume.dto.ScentDto;
import com.eightlow.decalcomanie.perfume.entity.Accord;
import com.eightlow.decalcomanie.perfume.entity.NoteList;
import com.eightlow.decalcomanie.perfume.entity.Perfume;
import com.eightlow.decalcomanie.perfume.entity.SeasonTime;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface PerfumeMapper {
    Perfume toEntity(PerfumeDto perfumeDto);

    List<Perfume> toEntity(List<PerfumeDto> perfumeDtoList);

    default List<PerfumeDto> toDto(List<Perfume> perfumeList) {
        List<PerfumeDto> perfumeDtoList = new ArrayList<>();

        for (Perfume perfume : perfumeList) {
           perfumeDtoList.add(toSimpleDto(perfume));
        }

        return perfumeDtoList;
    }

    default PerfumeDto toSimpleDto(Perfume perfume) {
        List<ScentDto> accords = new ArrayList<>();

        if(perfume.getAccord() != null) {
            for (Accord a : perfume.getAccord()) {
                ScentDto sdto = ScentDto.builder()
                        .weight(a.getWeight())
                        .rgb(a.getScent().getRgb())
                        .scentId(a.getScent().getScentId())
                        .nameOrg(a.getScent().getNameOrg())
                        .name(a.getScent().getName())
                        .build();

                accords.add(sdto);
            }
        }

        PerfumeDto pdto = PerfumeDto.builder()
                .perfumeId(perfume.getPerfumeId())
                .nameOrg(perfume.getNameOrg())
                .name(perfume.getName())
                .brandNameOrg(perfume.getBrand().getNameOrg())
                .brandName(perfume.getBrand().getName())
                .picture(perfume.getPicture())
                .accord(accords)
                .build();

        return pdto;
    }

    default PerfumeDto toDto(Perfume perfume) {
        List<ScentDto> accords = new ArrayList<>();
        List<NoteListDto> noteListDtoList = new ArrayList<>();
        List<OccasionDto> occasionDtoList = new ArrayList<>();

        if(perfume.getAccord() != null) {
            for (Accord a : perfume.getAccord()) {
                ScentDto sdto = ScentDto.builder()
                        .weight(a.getWeight())
                        .rgb(a.getScent().getRgb())
                        .scentId(a.getScent().getScentId())
                        .nameOrg(a.getScent().getNameOrg())
                        .name(a.getScent().getName())
                        .build();

                accords.add(sdto);
            }
        }

        if(perfume.getNote() != null) {
            for (NoteList noteList : perfume.getNote()) {
                NoteListDto nldto = NoteListDto.builder()
                        .noteId(noteList.getNote().getNoteId())
                        .noteListId(noteList.getNoteListId())
                        .noteName(noteList.getNote().getName())
                        .perfumeId(noteList.getPerfume().getPerfumeId())
                        .type(noteList.getType())
                        .build();

                noteListDtoList.add(nldto);
            }
        }

        if(perfume.getOccasion() != null) {
            for (SeasonTime seasonTime : perfume.getOccasion()) {
                OccasionDto odto = OccasionDto.builder()
                        .occasion(seasonTime.getOccasion())
                        .weight(seasonTime.getWeight())
                        .build();

                occasionDtoList.add(odto);
            }
        }

        PerfumeDto pdto = PerfumeDto.builder()
                .perfumeId(perfume.getPerfumeId())
                .name(perfume.getName())
                .nameOrg(perfume.getNameOrg())
                .brandId(perfume.getBrand().getBrandId())
                .brandName(perfume.getBrand().getName())
                .brandNameOrg(perfume.getBrand().getNameOrg())
                .picture(perfume.getPicture())
                .gender(perfume.getGender())
                .rate(perfume.getRate())
                .longevity(perfume.getLongevity())
                .sillage(perfume.getSillage())
                .pick(perfume.getPick())
                .accord(accords)
                .note(noteListDtoList)
                .occasion(occasionDtoList)
                .build();

        return pdto;
    }
}
