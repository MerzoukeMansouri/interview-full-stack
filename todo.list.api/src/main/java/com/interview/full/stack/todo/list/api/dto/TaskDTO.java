package com.interview.full.stack.todo.list.api.dto;

import lombok.Data;

@Data
public class TaskDTO {
    private String title;
    private String description;
    private boolean completed;
}
