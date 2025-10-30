package com.farm.controller;

import com.farm.dto.ApiResponse;
import com.farm.entity.User;
import com.farm.service.UserService;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody Map<String, Object> payload) {
        String username = (String) payload.get("username");
        String email = (String) payload.get("email");
        String password = (String) payload.get("password");
        @SuppressWarnings("unchecked")
        List<String> roles = (List<String>) payload.get("roles");
        Set<String> roleSet = roles == null ? Set.of() : Set.copyOf(roles);
        User user = userService.createUser(username, email, password, roleSet);
        return ResponseEntity.ok(new ApiResponse<>(true, "User created", user));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER')")
    public ResponseEntity<ApiResponse<List<User>>> listUsers() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Users", userService.listUsers()));
    }

    @PutMapping("/{id}/roles")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<User>> assignRoles(
            @PathVariable Long id, @RequestBody Map<String, List<String>> request) {
        User user = userService.assignRoles(id, Set.copyOf(request.getOrDefault("roles", List.of())));
        return ResponseEntity.ok(new ApiResponse<>(true, "Roles updated", user));
    }

    @PostMapping("/bootstrap")
    public ResponseEntity<ApiResponse<List<User>>> bootstrap() {
        return ResponseEntity.ok(userService.bootstrapDefaultUsers());
    }
}
