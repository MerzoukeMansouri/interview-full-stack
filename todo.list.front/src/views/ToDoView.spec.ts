import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import TodoView from '@/views/ToDoView.vue'
import { todo } from 'node:test'

const mockedTodoItems = [
  { id: '1', title: 'Learn Vue', completed: false },
  { id: '2', title: 'Learn Vitest', completed: true },
]

const mockedTodoItemReturnedAfterAdding = { id: '3', title: 'Write tests', completed: false }

// Mocking the services using your approach
const mockedGetTodos = vi.fn().mockResolvedValue(mockedTodoItems)

const mockedCreateTodo = vi.fn().mockResolvedValue({
  id: '3',
  title: 'Write tests',
  completed: false,
})

const mockedUpdateTodo = vi.fn().mockResolvedValue({
  id: '1',
  title: 'Learn Vue and Vitest',
  completed: true,
})

const mockedDeleteTodo = vi.fn().mockResolvedValue(undefined)

// Mock services before running tests
vi.mock('@/services/todo', () => ({
  getTodos: () => mockedGetTodos(),
  createTodo: (e) => mockedCreateTodo(e),
  updateTodo: () => mockedUpdateTodo(),
  deleteTodo: () => mockedDeleteTodo(),
}))

describe('TodoView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should load and display todos on mount', async () => {
    const wrapper = mount(TodoView)
    await wrapper.vm.$nextTick() // Wait for nextTick to ensure API call completes
    await flushPromises()
    const todoItems = wrapper.findAll('[data-testid="todo-title-input"]')
    expect(todoItems.length).toBe(2)
    expect(todoItems[0].element.value).toContain(mockedTodoItems[0].title)
    expect(todoItems[1].element.value).toContain(mockedTodoItems[1].title)
    expect(mockedGetTodos).toHaveBeenCalledTimes(1)
  })

  it('should add a new todo when clicking the "Add" button', async () => {
    const wrapper = mount(TodoView)
    const newName = mockedTodoItemReturnedAfterAdding.title

    // Simulate user input
    const input = wrapper.find('[data-testid="add-item-input"]')
    input.setValue('Write tests')
    // Simulate button click
    const button = wrapper.find('[data-testid="add-todo-button"]')
    await button.trigger('click')
    expect(mockedCreateTodo).toHaveBeenCalledWith({ id: '', title: newName, completed: false })
  })
})
