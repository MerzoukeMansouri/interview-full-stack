<script setup lang="ts">
import { defineProps, defineEmits, reactive } from 'vue'
import type { ToDoItem } from '@/types/toDoItem'

// Propriétés reçues du parent
const props = defineProps({
  todo: {
    type: Object as () => ToDoItem,
    required: true,
  },
})

// Événements émis vers le parent
const emit = defineEmits(['updateTodo', 'deleteTodo'])

// État local pour l'édition du titre
const editableTodo = reactive({ ...props.todo })

// Méthode pour inverser le statut "completed"
const toggleCompleted = () => {
  editableTodo.completed = !editableTodo.completed
  emit('updateTodo', editableTodo)
}

// Méthode pour supprimer le props.todo
const deleteCurrentTodo = () => {
  emit('deleteTodo', props.todo.id)
}
</script>

<template>
  <li class="todo-item" :data-testid="'todo-item-' + props.todo.id">
    <div class="todo-content" data-testid="todo-content">
      <!-- Champ d'édition du titre -->
      <input
        type="text"
        v-model="editableTodo.title"
        data-testid="todo-title-input"
        @blur="emit('updateTodo', editableTodo)"
      />
    </div>
    <div class="todo-actions" data-testid="todo-actions">
      <button @click="toggleCompleted" :data-testid="'todo-toggle-btn-' + todo.id">
        {{ todo.completed ? 'Marquer comme non terminé' : 'Marquer comme terminé' }}
      </button>
      <button
        @click="deleteCurrentTodo"
        class="delete-btn"
        :data-testid="'todo-delete-btn-' + todo.id"
      >
        Supprimer
      </button>
      <span class="todo-status" data-testid="todo-status">
        {{ todo.completed ? '✔️' : '❌' }}
      </span>
    </div>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 20px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  transition: transform 0.2s ease;
}

.todo-item:hover {
  transform: scale(1.02);
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.todo-status {
  font-size: 1.5rem;
  color: #3e8e41;
}

input[type='text'] {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type='text']:focus {
  border-color: #007bff;
}

.todo-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-left: 12px;
}

button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  transform: scale(0.98);
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
