package com.eightlow.decalcomanie.user.mapper;

import com.eightlow.decalcomanie.user.dto.UserPerfumeDto;
import com.eightlow.decalcomanie.user.entity.UserPerfume;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-26T17:30:19+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class UserPerfumeMapperImpl implements UserPerfumeMapper {

    @Override
    public UserPerfume toEntity(UserPerfumeDto userPerfumeDto) {
        if ( userPerfumeDto == null ) {
            return null;
        }

        UserPerfume.UserPerfumeBuilder userPerfume = UserPerfume.builder();

        userPerfume.userId( userPerfumeDto.getUserId() );
        userPerfume.perfumeId( userPerfumeDto.getPerfumeId() );

        return userPerfume.build();
    }

    @Override
    public UserPerfumeDto toDto(UserPerfume userPerfume) {
        if ( userPerfume == null ) {
            return null;
        }

        UserPerfumeDto.UserPerfumeDtoBuilder userPerfumeDto = UserPerfumeDto.builder();

        userPerfumeDto.userId( userPerfume.getUserId() );
        userPerfumeDto.perfumeId( userPerfume.getPerfumeId() );

        return userPerfumeDto.build();
    }

    @Override
    public List<UserPerfume> toEntity(List<UserPerfumeDto> userPerfumeDtoList) {
        if ( userPerfumeDtoList == null ) {
            return null;
        }

        List<UserPerfume> list = new ArrayList<UserPerfume>( userPerfumeDtoList.size() );
        for ( UserPerfumeDto userPerfumeDto : userPerfumeDtoList ) {
            list.add( toEntity( userPerfumeDto ) );
        }

        return list;
    }

    @Override
    public List<UserPerfumeDto> toDto(List<UserPerfume> userPerfumeList) {
        if ( userPerfumeList == null ) {
            return null;
        }

        List<UserPerfumeDto> list = new ArrayList<UserPerfumeDto>( userPerfumeList.size() );
        for ( UserPerfume userPerfume : userPerfumeList ) {
            list.add( toDto( userPerfume ) );
        }

        return list;
    }
}
