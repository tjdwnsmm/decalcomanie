package com.eightlow.decalcomanie.user.mapper;

import com.eightlow.decalcomanie.user.dto.FollowDto;
import com.eightlow.decalcomanie.user.entity.Follow;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-26T17:30:18+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11 (Oracle Corporation)"
)
@Component
public class FollowMapperImpl implements FollowMapper {

    @Override
    public Follow toEntity(FollowDto followDto) {
        if ( followDto == null ) {
            return null;
        }

        Follow.FollowBuilder follow = Follow.builder();

        follow.following( followDto.getFollowing() );
        follow.followed( followDto.getFollowed() );

        return follow.build();
    }

    @Override
    public FollowDto toDto(Follow follow) {
        if ( follow == null ) {
            return null;
        }

        FollowDto.FollowDtoBuilder followDto = FollowDto.builder();

        followDto.following( follow.getFollowing() );
        followDto.followed( follow.getFollowed() );

        return followDto.build();
    }

    @Override
    public List<Follow> toEntity(List<FollowDto> followDtoList) {
        if ( followDtoList == null ) {
            return null;
        }

        List<Follow> list = new ArrayList<Follow>( followDtoList.size() );
        for ( FollowDto followDto : followDtoList ) {
            list.add( toEntity( followDto ) );
        }

        return list;
    }

    @Override
    public List<FollowDto> toDto(List<Follow> followList) {
        if ( followList == null ) {
            return null;
        }

        List<FollowDto> list = new ArrayList<FollowDto>( followList.size() );
        for ( Follow follow : followList ) {
            list.add( toDto( follow ) );
        }

        return list;
    }
}
