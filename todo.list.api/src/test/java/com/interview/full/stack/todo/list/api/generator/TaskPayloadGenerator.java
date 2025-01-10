package com.interview.full.stack.todo.list.api.generator;

import com.interview.full.stack.todo.list.api.payload.TaskPayload;
import lombok.experimental.UtilityClass;
import org.jeasy.random.EasyRandom;

@UtilityClass
public class TaskPayloadGenerator {
    private final EasyRandom generator = new EasyRandom();

    public static TaskPayload generateSimpleTaskPayload() {
        return generator.nextObject(TaskPayload.class);
    }

}
