import { NextRequest, NextResponse } from 'next/server';
import { taskStore } from '@/lib/taskStore';

// GET /tasks - Get all tasks
export async function GET() {
  try {
    const tasks = taskStore.getAllTasks();
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, color = '#3B82F6' } = body;

    if (!text || typeof text !== 'string' || text.trim() === '') {
      return NextResponse.json(
        { error: 'Task text is required' },
        { status: 400 }
      );
    }

    const newTask = taskStore.createTask(text, color);

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
