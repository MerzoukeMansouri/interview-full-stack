package com.interview.full.stack.todo.list.api.controller;


import com.interview.full.stack.todo.list.api.dto.TaskDTO;
import com.interview.full.stack.todo.list.api.payload.TaskPayload;
import com.interview.full.stack.todo.list.api.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("")
    public List<TaskDTO> getTasks() {
        return taskService.getTasks();
    }

    @PostMapping("")
    public TaskDTO createTask(@RequestBody @Valid TaskPayload payload) {
        return taskService.createTask(payload);
    }

}
