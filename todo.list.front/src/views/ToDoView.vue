<script setup lang="ts">
import { ref } from 'vue';

// const URL = 'http://163.172.45.231:8080/tasks';
const URL = 'http://localhost:8080/tasks';
// const tasks = ref([
//   { title: "Buy groceries", description: "Milk, bread, and eggs", completed: false },
//   { title: "Finish homework", description: "Math and science", completed: true },
// ]);

const tasks = ref([]);

const getTasks = async () => {
  const response = await fetch(URL);
  tasks.value = await response.json();
};

getTasks();
</script>

<template>
  <div class="tasks-container">
    <div class="tasks-grid">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="task-card"
        :class="{ completed: task.completed }"
      >
        <h2>{{ task.title }}</h2>
        <p>{{ task.description }}</p>
        <div class="status">
          <span :class="{ completed: task.completed }">
            {{ task.completed ? "Completed" : "Pending" }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tasks-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.tasks-container h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.task-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.task-card.completed {
  border-color: #4caf50;
  background-color: #e8f5e9;
}

.task-card h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.task-card p {
  font-size: 1rem;
  margin-bottom: 15px;
  color: #666;
}

.status span {
  display: inline-block;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
}

.status span.completed {
  color: #fff;
  background-color: #4caf50;
}

.status span:not(.completed) {
  color: #fff;
  background-color: #f44336;
}
</style>