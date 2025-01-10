package com.interview.full.stack.todo.list.api.service;

import com.interview.full.stack.todo.list.api.dto.TaskDTO;
import com.interview.full.stack.todo.list.api.entity.TaskEntity;
import com.interview.full.stack.todo.list.api.repository.TaskRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.stream.IntStream;

import static com.interview.full.stack.todo.list.api.generator.TaskEntityGenerator.generateSimpleTaskEntities;
import static com.interview.full.stack.todo.list.api.generator.TaskEntityGenerator.generateSimpleTaskEntity;
import static com.interview.full.stack.todo.list.api.generator.TaskPayloadGenerator.generateSimpleTaskPayload;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {
    @InjectMocks
    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    @Test
    @DisplayName("Should return a list of tasks")
    void should_return_tasks() {
        var tasksMocked = generateSimpleTaskEntities(5);
        when(taskRepository.findAll()).thenReturn(tasksMocked);

        List<TaskDTO> tasks = taskService.getTasks();

        assertNotNull(tasks, "Tasks should not be null");
        assertEquals(tasksMocked.size(), tasks.size(), "The size of tasks should match the mocked entities");

        IntStream.range(0, tasksMocked.size())
                .forEach(i -> {
                    TaskEntity taskEntity = tasksMocked.get(i);
                    TaskDTO taskDTO = tasks.get(i);

                    assertEquals(taskEntity.getTitle(), taskDTO.getTitle(), "Task title mismatch at index " + i);
                    assertEquals(taskEntity.getDescription(), taskDTO.getDescription(), "Task description mismatch at index " + i);
                    assertEquals(taskEntity.isCompleted(), taskDTO.isCompleted(), "Task completed mismatch at index " + i);
                });

    }

    @Test
    @DisplayName("Should create a task")
    void should_create_task() {
        var taskEntity = generateSimpleTaskEntity();
        when(taskRepository.save(any())).thenReturn(taskEntity);

        TaskDTO taskDTO = taskService.createTask(generateSimpleTaskPayload());

        assertNotNull(taskDTO, "Task should not be null");
        assertEquals(taskEntity.getTitle(), taskDTO.getTitle(), "Task title mismatch");
        assertEquals(taskEntity.getDescription(), taskDTO.getDescription(), "Task description mismatch");
        assertEquals(taskEntity.isCompleted(), taskDTO.isCompleted(), "Task completed mismatch");
    }
}
