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
    })

    it('devrait lancer une erreur si la requête échoue', async () => {})
  })

  describe('createTodo', () => {
    it('devrait créer un nouveau todo', async () => {})

    it('devrait lancer une erreur si la création échoue', async () => {})
  })

  describe('updateTodo', () => {
    it('devrait mettre à jour un todo existant', async () => {})

    it('devrait lancer une erreur si la mise à jour échoue', async () => {})
  })

  describe('deleteTodo', () => {
    it('devrait supprimer un todo existant', async () => {})

    it('devrait lancer une erreur si la suppression échoue', async () => {})
  })
})
