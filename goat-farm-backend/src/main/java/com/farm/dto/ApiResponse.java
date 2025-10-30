package com.farm.dto;

public record ApiResponse<T>(
        boolean success,
        String message,
        T data) {
}
