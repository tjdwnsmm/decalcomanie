package com.eightlow.decalcomanie.user.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class UserInfoUpdateRequest {
    private String nickname;
    private List<Integer> favorite;
    private List<Integer> hate;
}
