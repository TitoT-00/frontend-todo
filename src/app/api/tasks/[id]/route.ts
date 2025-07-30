import { NextRequest, NextResponse } from 'next/server';
import { taskStore } from '@/lib/taskStore';

// PUT /api/tasks/:id - Update a task
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const taskId = parseInt(id);
    const body = await request.json();
    const { text, color, completed } = body;

    if (isNaN(taskId)) {
      return NextResponse.json(
        { error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    // Validate text if provided
    if (text !== undefined && (typeof text !== 'string' || text.trim() === '')) {
      return NextResponse.json(
        { error: 'Task text must be a non-empty string' },
        { status: 400 }
      );
    }

    // Prepare updates object
    const updates: any = {};
    if (text !== undefined) updates.text = text.trim();
    if (color !== undefined) updates.color = color;
    if (completed !== undefined) updates.completed = Boolean(completed);

    const updatedTask = taskStore.updateTask(taskId, updates);
    
    if (!updatedTask) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ task: updatedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/:id - Delete a task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const taskId = parseInt(id);

    if (isNaN(taskId)) {
      return NextResponse.json(
        { error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    const deletedTask = taskStore.deleteTask(taskId);
    
    if (!deletedTask) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ task: deletedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
