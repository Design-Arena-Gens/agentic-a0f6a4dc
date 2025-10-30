package com.farm.controller;

import com.farm.dto.ApiResponse;
import com.farm.entity.FarmTask;
import com.farm.service.TaskService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER')")
    public ResponseEntity<ApiResponse<FarmTask>> createTask(@RequestBody FarmTask task) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Task created", taskService.createTask(task)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','WORKER')")
    public ResponseEntity<ApiResponse<List<FarmTask>>> listTasks(
            @RequestParam Long farmId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Tasks", taskService.listTasks(farmId, start, end)));
    }

    @PostMapping("/{taskId}/complete")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','WORKER')")
    public ResponseEntity<ApiResponse<FarmTask>> completeTask(@PathVariable Long taskId) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Task completed", taskService.completeTask(taskId)));
    }
}
