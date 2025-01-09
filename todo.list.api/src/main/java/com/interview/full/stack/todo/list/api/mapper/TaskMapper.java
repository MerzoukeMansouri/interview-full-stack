package com.interview.full.stack.todo.list.api.mapper;

import com.interview.full.stack.todo.list.api.dto.TaskDTO;
import com.interview.full.stack.todo.list.api.entity.TaskEntity;
import com.interview.full.stack.todo.list.api.payload.TaskPayload;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface TaskMapper {

    TaskMapper MAPPER = Mappers.getMapper(TaskMapper.class);

    @Mapping(target = "id", ignore = true)
    TaskEntity toEntity(TaskPayload payload);

    List<TaskEntity> toEntity(List<TaskPayload> payload);

    TaskDTO toDTO(TaskEntity entity);

    List<TaskDTO> toDTO(List<TaskEntity> entity);

}