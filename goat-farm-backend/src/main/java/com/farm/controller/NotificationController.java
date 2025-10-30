package com.farm.controller;

import com.farm.dto.ApiResponse;
import com.farm.entity.Notification;
import com.farm.service.NotificationService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER')")
    public ResponseEntity<ApiResponse<Notification>> sendNotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Notification queued", notificationService.sendNotification(notification)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER')")
    public ResponseEntity<ApiResponse<List<Notification>>> listNotifications() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Notifications", notificationService.listNotifications()));
    }
}
