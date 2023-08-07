package com.eightlow.decalcomanie.user.entity;

import lombok.Getter;

import javax.persistence.Table;

@Getter
@Table(name = "status")
public enum Status {
    FAVORITE("FAVORITE"),
    HATE("HATE");

    private final String value;

    Status(String value) {
        this.value = value;
    }
}
