import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import TodoView from '@/views/ToDoView.vue'
import { todo } from 'node:test'

const mockedTodoItems = [
  { id: '1', title: 'Learn Vue', completed: false },
  { id: '2', title: 'Learn Vitest', completed: true },
]

describe('TodoView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should load and display todos on mount', async () => {})

  it('should add a new todo when clicking the "Add" button', async () => {})
})
