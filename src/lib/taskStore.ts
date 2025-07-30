// Shared in-memory task store
// In production, this would be replaced with a database

export interface Task {
  id: number;
  text: string;
  color: string;
  completed: boolean;
  createdAt: string;
}

class TaskStore {
  private tasks: Task[] = [];
  private nextId = 1;

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  createTask(text: string, color: string = '#3B82F6'): Task {
    const newTask: Task = {
      id: this.nextId++,
      text: text.trim(),
      color,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
    return this.tasks[taskIndex];
  }

  deleteTask(id: number): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }

    return this.tasks.splice(taskIndex, 1)[0];
  }

  getTask(id: number): Task | null {
    return this.tasks.find(task => task.id === id) || null;
  }
}

// Export a singleton instance
export const taskStore = new TaskStore();
