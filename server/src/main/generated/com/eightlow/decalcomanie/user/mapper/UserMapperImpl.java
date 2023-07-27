package com.eightlow.decalcomanie.user.mapper;

import com.eightlow.decalcomanie.user.dto.UserDto;
import com.eightlow.decalcomanie.user.entity.User;
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
public class UserMapperImpl implements UserMapper {

    @Override
    public User toEntity(UserDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.userId( userDto.getUserId() );
        user.accessToken( userDto.getAccessToken() );
        user.nickname( userDto.getNickname() );
        user.deletedAt( userDto.getDeletedAt() );
        user.age( userDto.getAge() );
        user.gender( userDto.getGender() );
        user.refreshToken( userDto.getRefreshToken() );
        user.picture( userDto.getPicture() );

        return user.build();
    }

    @Override
    public UserDto toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.UserDtoBuilder userDto = UserDto.builder();

        userDto.userId( user.getUserId() );
        userDto.accessToken( user.getAccessToken() );
        userDto.nickname( user.getNickname() );
        userDto.deletedAt( user.getDeletedAt() );
        userDto.age( user.getAge() );
        userDto.gender( user.getGender() );
        userDto.refreshToken( user.getRefreshToken() );
        userDto.picture( user.getPicture() );

        return userDto.build();
    }

    @Override
    public List<User> toEntity(List<UserDto> userDtoList) {
        if ( userDtoList == null ) {
            return null;
        }

        List<User> list = new ArrayList<User>( userDtoList.size() );
        for ( UserDto userDto : userDtoList ) {
            list.add( toEntity( userDto ) );
        }

        return list;
    }

    @Override
    public List<UserDto> toDto(List<User> userList) {
        if ( userList == null ) {
            return null;
        }

        List<UserDto> list = new ArrayList<UserDto>( userList.size() );
        for ( User user : userList ) {
            list.add( toDto( user ) );
        }

        return list;
    }
}
