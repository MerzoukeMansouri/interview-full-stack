import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/services/todo'
import type { ToDoItem } from '@/types/toDoItem'

const mockFetch = vi.fn()

// Mock global fetch
global.fetch = mockFetch as unknown as typeof fetch

describe('todoService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getTodos', () => {
    it('devrait récupérer une liste de todos', async () => {
      const mockTodos: ToDoItem[] = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
      ]
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTodos,
      })

      const todos = await getTodos()
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      expect(todos).toEqual(mockTodos)
    })

    it('devrait lancer une erreur si la requête échoue', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 })

      await expect(getTodos()).rejects.toThrow('Erreur lors de la récupération des todos : 500')
    })
  })

  describe('createTodo', () => {
    it('devrait créer un nouveau todo', async () => {
      const newTodo = { title: 'New Todo', completed: false }
      const mockResponse: ToDoItem = { id: 3, ...newTodo }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const createdTodo = await createTodo(newTodo)
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      })
      expect(createdTodo).toEqual(mockResponse)
    })

    it('devrait lancer une erreur si la création échoue', async () => {
      const newTodo = { title: 'New Todo', completed: false }
      mockFetch.mockResolvedValueOnce({ ok: false, status: 400 })

      await expect(createTodo(newTodo)).rejects.toThrow('Erreur lors de la création du todo : 400')
    })
  })

  describe('updateTodo', () => {
    it('devrait mettre à jour un todo existant', async () => {
      const updatedTodo: ToDoItem = { id: 1, title: 'Updated Todo', completed: true }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => updatedTodo,
      })

      const result = await updateTodo(updatedTodo)
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      })
      expect(result).toEqual(updatedTodo)
    })

    it('devrait lancer une erreur si la mise à jour échoue', async () => {
      const updatedTodo: ToDoItem = { id: 1, title: 'Updated Todo', completed: true }
      mockFetch.mockResolvedValueOnce({ ok: false, status: 404 })

      await expect(updateTodo(updatedTodo)).rejects.toThrow(
        'Erreur lors de la mise à jour du todo : 404',
      )
    })
  })

  describe('deleteTodo', () => {
    it('devrait supprimer un todo existant', async () => {
      const todoId = '1'
      mockFetch.mockResolvedValueOnce({ ok: true })

      await deleteTodo(todoId)
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
    })

    it('devrait lancer une erreur si la suppression échoue', async () => {
      const todoId = '1'
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 })

      await expect(deleteTodo(todoId)).rejects.toThrow(
        'Erreur lors de la suppression du todo : 500',
      )
    })
  })
})
