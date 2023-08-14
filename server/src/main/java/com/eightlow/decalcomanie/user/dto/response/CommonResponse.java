package com.eightlow.decalcomanie.user.dto.response;

import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder(toBuilder = true)
public class CommonResponse {
    private UserInfoDto targetUser;
    private List<FollowerResponse> data;
}
