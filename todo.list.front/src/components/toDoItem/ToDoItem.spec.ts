import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ToDoItem from './ToDoItem.vue'
import type { ToDoItem as ToDoItemType } from '@/types/toDoItem'

describe('ToDoItem.vue', () => {
  const mockTodo: ToDoItemType = {
    id: '1',
    title: 'Test ToDo',
    completed: false,
  }

  it('emits the "updateTodo" event with new title after bluring with expected toto', async () => {
    // Test logic here
  })

  it('toggles the "completed" status and emits the "updateTodo" event with expected todo', async () => {
    // Test logic here
  })

  it('emits the "deleteTodo" event when the delete button is clicked with expected id', async () => {
    // Test logic here
  })
})
