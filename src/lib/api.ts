// API utility functions for task operations

export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
}

const API_BASE = 'http://localhost:3001/tasks';
const API_ROOT = 'http://localhost:3001';

// Check if backend is available
export async function checkBackendAvailability(): Promise<boolean> {
  try {
    const response = await fetch(API_ROOT, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Backend connection error:', error);
    return false;
  }
}

// GET /tasks - Fetch all tasks
export async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch(API_BASE);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data; // Backend returns tasks directly, not wrapped
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

// POST /tasks - Create a new task
export async function createTask(title: string, color: string = '#3B82F6'): Promise<Task> {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, color }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data; // Backend returns task directly
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// PUT /tasks/:id - Update a task
export async function updateTask(
  id: number, 
  updates: Partial<Pick<Task, 'title' | 'color' | 'completed'>>
): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to update task: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data; // Backend returns task directly
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

// DELETE /api/tasks/:id - Delete a task
export async function deleteTask(id: number): Promise<Task> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to delete task: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data; // Backend returns task directly
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

// Toggle task completion status
export async function toggleTaskCompletion(id: number, completed: boolean): Promise<Task> {
  return updateTask(id, { completed });
}
