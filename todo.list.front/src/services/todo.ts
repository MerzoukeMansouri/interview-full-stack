import type { ToDoItem } from '@/types/toDoItem'

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com/todos' // Fake API de démonstration

/**
 * Récupère la liste des todos
 * @returns Une promesse contenant un tableau de todos
 */
export const getTodos = async (): Promise<ToDoItem[]> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des todos : ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Ajoute un nouveau todo
 * @param todo Un objet représentant le todo à ajouter
 * @returns Une promesse contenant le todo ajouté
 */
export const createTodo = async (todo: {
  title: string
  completed: boolean
}): Promise<ToDoItem> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })

    if (!response.ok) {
      throw new Error(`Erreur lors de la création du todo : ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Met à jour un todo existant
 * @param id L'identifiant du todo à mettre à jour
 * @param todo Un objet contenant les données à mettre à jour
 * @returns Une promesse contenant le todo mis à jour
 */
export const updateTodo = async (todo: ToDoItem): Promise<ToDoItem> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour du todo : ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Supprime un todo existant
 * @param id L'identifiant du todo à supprimer
 * @returns Une promesse qui résout lorsqu'un todo est supprimé
 */
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression du todo : ${response.status}`)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
