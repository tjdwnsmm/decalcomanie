package com.eightlow.decalcomanie.sns.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedInquiryRequest {
    private String userId;

    private Integer dataSize;

    private Integer heartCnt;

    private Integer lastArticleId;
}
