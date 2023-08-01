package com.eightlow.decalcomanie.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KakaoProfile {
    public Long id;
    @JsonProperty("connected_at")
    public String connectedAt;
    @JsonProperty("kakao_account")
    public KakaoAccount kakaoAccount;

    @Data
    public class KakaoAccount {
        @JsonProperty("has_email")
        public Boolean hasEmail;
        @JsonProperty("email_needs_agreement")
        public Boolean emailNeedsAgreement;
        @JsonProperty("is_email_valid")
        public Boolean isEmailValid;
        @JsonProperty("is_email_verified")
        public Boolean isEmailVerified;
        public String email;
        @JsonProperty("has_age_range")
        public Boolean hasAgeRange;
        @JsonProperty("age_range_needs_agreement")
        public Boolean ageRangeNeedsAgreement;
        @JsonProperty("age_range")
        public String ageRange;
        @JsonProperty("has_gender")
        public Boolean hasGender;
        @JsonProperty("gender_needs_agreement")
        public Boolean genderNeedsAgreement;
        public String gender;
    }
}

