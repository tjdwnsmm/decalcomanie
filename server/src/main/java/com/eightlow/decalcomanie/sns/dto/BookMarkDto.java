package com.eightlow.decalcomanie.sns.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.repository.Modifying;

@Getter
@SuperBuilder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BookMarkDto {
    private int articleId;
    private String userId;

}
