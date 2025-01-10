package com.interview.full.stack.todo.list.api;

import com.interview.full.stack.todo.list.api.common.ControllerTest;
import com.interview.full.stack.todo.list.api.dto.TaskDTO;
import com.interview.full.stack.todo.list.api.payload.TaskPayload;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.interview.full.stack.todo.list.api.generator.TaskPayloadGenerator.generateSimpleTaskPayload;
import static org.assertj.core.api.Assertions.assertThat;

class TaskControllerTest extends ControllerTest {
	@Test
	void createTaskShouldAddTask() {
		TaskPayload payload = generateSimpleTaskPayload();
		TaskDTO createdTask = restTemplate.postForObject(url(), payload, TaskDTO.class);
		assertThat(createdTask).isNotNull();
		assertThat(createdTask.getTitle()).isEqualTo(payload.title());
		assertThat(createdTask.getDescription()).isEqualTo(payload.description());
	}
}