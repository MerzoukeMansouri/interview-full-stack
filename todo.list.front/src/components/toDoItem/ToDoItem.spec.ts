import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ToDoItem from './ToDoItem.vue'
import type { ToDoItem as ToDoItemType } from '@/types/toDoItem'
import { wrap } from 'module'

describe('ToDoItem.vue', () => {
  const mockTodo: ToDoItemType = {
    id: '1',
    title: 'Test ToDo',
    completed: false,
  }

  it('emits the "updateTodo" event whith new title after bluring', async () => {
    const wrapper = mount(ToDoItem, {
      props: {
        todo: mockTodo,
      },
    })

    const input = wrapper.find('[data-testid="todo-title-input"]')
    await input.setValue('Updated ToDo Title')
    await input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('updateTodo')).toBeTruthy()
    expect(wrapper.emitted('updateTodo')?.[0][0]).toEqual({
      ...mockTodo,
      title: 'Updated ToDo Title',
    })
  })

  it('toggles the "completed" status and emits the "updateTodo" event', async () => {
    const wrapper = mount(ToDoItem, {
      props: {
        todo: mockTodo,
      },
    })

    const toggleButton = wrapper.find('[data-testid="todo-toggle-btn-1"]')
    await toggleButton.trigger('click')

    expect(wrapper.emitted('updateTodo')).toBeTruthy()
    expect(wrapper.emitted('updateTodo')?.[0][0]).toEqual({
      ...mockTodo,
      completed: true,
    })
    await wrapper.vm.$nextTick()
    // Check if the status changes
    // expect(wrapper.find('[data-testid="todo-status"]').text()).toBe('✔️')
  })

  it('emits the "deleteTodo" event when the delete button is clicked', async () => {
    const wrapper = mount(ToDoItem, {
      props: {
        todo: mockTodo,
      },
    })

    const deleteButton = wrapper.find('[data-testid="todo-delete-btn-1"]')
    await deleteButton.trigger('click')

    expect(wrapper.emitted('deleteTodo')).toBeTruthy()
    expect(wrapper.emitted('deleteTodo')?.[0][0]).toBe(mockTodo.id)
  })
})
