package com.farm.service;

import com.farm.dto.ApiResponse;
import com.farm.entity.Role;
import com.farm.entity.User;
import com.farm.exception.BadRequestException;
import com.farm.exception.NotFoundException;
import com.farm.repository.RoleRepository;
import com.farm.repository.UserRepository;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User createUser(String username, String email, String password, Set<String> roles) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new BadRequestException("Username already exists");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new BadRequestException("Email already exists");
        }
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setRoles(resolveRoles(roles == null || roles.isEmpty() ? Set.of("WORKER") : roles));
        return userRepository.save(user);
    }

    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public User assignRoles(Long userId, Set<String> roles) {
        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        user.setRoles(resolveRoles(roles));
        return userRepository.save(user);
    }

    private Set<Role> resolveRoles(Set<String> roleNames) {
        return roleNames.stream()
                .map(name -> roleRepository
                        .findByName(name)
                        .orElseThrow(() -> new NotFoundException("Role not found: " + name)))
                .collect(Collectors.toSet());
    }

    public ApiResponse<List<User>> bootstrapDefaultUsers() {
        if (roleRepository.count() == 0) {
            roleRepository.saveAll(List.of(
                    role("SUPER_ADMIN"),
                    role("FARM_MANAGER"),
                    role("VERIFIER"),
                    role("APPROVER"),
                    role("WORKER"),
                    role("VET")));
        }
        if (userRepository.count() == 0) {
            createUser("superadmin", "superadmin@goatfarm.io", "ChangeMe123!", Set.of("SUPER_ADMIN"));
            createUser("manager", "manager@goatfarm.io", "ChangeMe123!", Set.of("FARM_MANAGER", "APPROVER"));
            createUser("vet", "vet@goatfarm.io", "ChangeMe123!", Set.of("VET"));
        }
        return new ApiResponse<>(true, "Bootstrap complete", userRepository.findAll());
    }

    private Role role(String name) {
        Role role = new Role();
        role.setName(name);
        role.setDescription(name.replace("_", " ") + " role");
        return role;
    }
}
