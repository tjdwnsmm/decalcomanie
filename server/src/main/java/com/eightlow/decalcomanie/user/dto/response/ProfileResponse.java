package com.eightlow.decalcomanie.user.dto.response;

import com.eightlow.decalcomanie.sns.dto.response.FeedResponse;
import com.eightlow.decalcomanie.user.dto.UserInfoDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class ProfileResponse {
    private int following;
    private int follower;
    private UserInfoDto userInfo;
}
