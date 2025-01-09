package com.interview.full.stack.todo.list.api.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "tasks")
public class TaskEntity {
    @Id
    private String id;
    private String title;
    private String description;
    private boolean completed;
}
