package com.interview.full.stack.todo.list.api.repository;

import com.interview.full.stack.todo.list.api.entity.TaskEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends MongoRepository<TaskEntity, String> {
}
