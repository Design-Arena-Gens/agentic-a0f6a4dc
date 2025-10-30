package com.farm.service;

import com.farm.entity.Farm;
import com.farm.entity.FarmTask;
import com.farm.exception.NotFoundException;
import com.farm.repository.FarmRepository;
import com.farm.repository.FarmTaskRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskService {

    private final FarmTaskRepository farmTaskRepository;
    private final FarmRepository farmRepository;

    public TaskService(FarmTaskRepository farmTaskRepository, FarmRepository farmRepository) {
        this.farmTaskRepository = farmTaskRepository;
        this.farmRepository = farmRepository;
    }

    @Transactional
    public FarmTask createTask(FarmTask task) {
        if (task.getFarm() != null && task.getFarm().getId() != null) {
            Farm farm = farmRepository
                    .findById(task.getFarm().getId())
                    .orElseThrow(() -> new NotFoundException("Farm not found"));
            task.setFarm(farm);
        }
        return farmTaskRepository.save(task);
    }

    public List<FarmTask> listTasks(Long farmId, LocalDate start, LocalDate end) {
        if (farmId == null) {
            return farmTaskRepository.findAll();
        }
        return farmTaskRepository.findByFarmIdAndDueDateBetween(farmId, start, end);
    }

    @Transactional
    public FarmTask completeTask(Long taskId) {
        FarmTask task = farmTaskRepository
                .findById(taskId)
                .orElseThrow(() -> new NotFoundException("Task not found"));
        task.setStatus("COMPLETED");
        task.setCompletedAt(task.getCompletedAt() == null ? java.time.LocalDateTime.now() : task.getCompletedAt());
        return farmTaskRepository.save(task);
    }
}
