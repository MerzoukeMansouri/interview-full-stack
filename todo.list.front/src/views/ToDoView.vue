<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/services/todo'
import type { ToDoItem } from '@/types/toDoItem'

import TodoItem from '@/components/toDoItem/ToDoItem.vue'

// State local pour la liste des todos
const todos = ref<ToDoItem[]>([])
const newTodo = reactive({ id: '', title: '', completed: false })

// Charger les todos depuis le service
const loadTodos = async () => {
  try {
    todos.value = await getTodos()
  } catch (error) {
    console.error('Erreur lors du chargement des todos :', error)
  }
}

// Ajouter un nouveau todo
const handleAddTodo = async () => {
  try {
    const createdTodo = await createTodo(newTodo)
    todos.value.push(createdTodo)
  } catch (error) {
    console.error("Erreur lors de l'ajout du todo :", error)
  }
}

// Mettre à jour un todo
const handleUpdateTodo = async (todoItem: ToDoItem) => {
  try {
    const updatedTodo = await updateTodo(todoItem)
    const index = todos.value.findIndex((todo) => todo.id === updatedTodo.id)
    if (index !== -1) {
      todos.value[index] = updatedTodo
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du todo :', error)
  }
}

// // Supprimer un todo
const handleDeleteTodo = async (id: string) => {
  try {
    await deleteTodo(id)
    todos.value = todos.value.filter((todo) => todo.id !== id)
  } catch (error) {
    console.error('Erreur lors de la suppression du todo :', error)
  }
}

onMounted(() => {
  loadTodos()
})
</script>

<template>
  <div class="about" data-testid="todo-container">
    <h1 data-testid="todo-header">Liste des Todos</h1>
    <input v-model="newTodo.title" data-testid="add-item-input" />

    <button @click="handleAddTodo()" data-testid="add-todo-button">
      Ajouter un Todo ({{ todos.length }})
    </button>

    <ul data-testid="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @updateTodo="handleUpdateTodo"
        @deleteTodo="handleDeleteTodo"
      />
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 500px;
    padding: 20px;
    gap: 20px;
  }
}
ul {
  list-style: none;
  padding: 0;
}
</style>
