package com.interview.full.stack.todo.list.api.service;

import com.interview.full.stack.todo.list.api.dto.TaskDTO;
import com.interview.full.stack.todo.list.api.mapper.TaskMapper;
import com.interview.full.stack.todo.list.api.payload.TaskPayload;
import com.interview.full.stack.todo.list.api.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public List<TaskDTO> getTasks() {
        return TaskMapper.MAPPER.toDTO(taskRepository.findAll());
    }

    public TaskDTO createTask(TaskPayload payload) {
        var entity = TaskMapper.MAPPER.toEntity(payload);
        taskRepository.save(entity);
        return TaskMapper.MAPPER.toDTO(entity);
    }
}
