package com.eightlow.decalcomanie.user.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class UserInfoUpdateRequest {
    private String nickname;
    private String picture;
    private List<Integer> favorite;
    private List<Integer> hate;
}
