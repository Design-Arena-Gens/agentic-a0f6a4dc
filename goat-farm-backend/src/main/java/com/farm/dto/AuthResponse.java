package com.farm.dto;

import java.util.Set;

public record AuthResponse(
        String token,
        Long userId,
        String username,
        Set<String> roles) {
}
