package com.eightlow.decalcomanie.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException{
    CustomErrorCode errorCode;
}