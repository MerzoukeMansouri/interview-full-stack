package com.interview.full.stack.todo.list.api.generator;

import com.interview.full.stack.todo.list.api.entity.TaskEntity;
import lombok.experimental.UtilityClass;
import org.jeasy.random.EasyRandom;

import java.util.List;

@UtilityClass
public class TaskEntityGenerator {

    private EasyRandom generator = new EasyRandom();

    public static TaskEntity generateSimpleTaskEntity() {
        return generator.nextObject(TaskEntity.class);
    }

    public static List<TaskEntity> generateSimpleTaskEntities(int size) {
        return generator.objects(TaskEntity.class, size).toList();
    }
}
