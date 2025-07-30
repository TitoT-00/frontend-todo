'use client';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Header from '@/components/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchTasks, createTask, toggleTaskCompletion, deleteTask as deleteTaskAPI, Task, checkBackendAvailability } from '@/lib/api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'tasks' | 'completed'>('tasks');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Fetch tasks on component mount
  useEffect(() => {
    loadTasks();
    
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };


  const toggleTask = async (id: number) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        const updatedTask = await toggleTaskCompletion(id, !task.completed);
        setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      }
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTaskAPI(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Header */}
      <Header />

      {/* Overlapping Button */}
      <div className="w-full flex justify-center -mt-6 z-10 relative">
        <button 
          onClick={() => router.push('/add-task')}
          className="bg-[#1E6F9F] hover:bg-blue-700 text-white font-semibold shadow-lg flex items-center justify-center gap-2"
          style={{
            width: "736px",
            borderRadius: "8px",
            padding: "16px",
            height: "52px",
          }}
        >
          Create Task
          <ControlPointIcon style={{ fontSize: 20 }} />
        </button>
      </div>

      {/* Body Section */}
      <div className="max-w-3xl mx-auto mt-8 text-center">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded-lg mb-4">
            {error}
            <button 
              onClick={() => setError(null)}
              className="ml-2 text-red-300 hover:text-red-100"
            >
              ×
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-between items-center border-b border-zinc-700 pb-2 mb-8 px-2 text-sm">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`font-semibold flex items-center gap-2 ${
              activeTab === 'tasks' ? '' : 'text-gray-400 hover:text-gray-300'
            }`}
            style={activeTab === 'tasks' ? { color: '#4EA8DE' } : {}}
          >
            Tasks 
            <span className="bg-zinc-700 text-white px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`font-semibold flex items-center gap-2 ${
              activeTab === 'completed' ? '' : 'text-gray-400 hover:text-gray-300'
            }`}
            style={activeTab === 'completed' ? { color: '#5E60CE' } : {}}
          >
            Completed 
            <span className="bg-zinc-700 text-white px-2 py-0.5 rounded-full">
              {completedTasks.length}{tasks.length > 0 ? ` of ${tasks.length}` : ''}
            </span>
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center text-zinc-400 mt-20">
            <div className="text-4xl mb-4">⏳</div>
            <p className="font-medium">Loading tasks...</p>
          </div>
        ) : (
          /* Task List or Empty State */
          activeTab === 'tasks' ? (
            tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-zinc-400 mt-20">
                <div className="mb-4">
                  <Image src="/clipboard.svg" width={48} height={48} alt="Clipboard" />
                </div>
                <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}>You don't have any tasks registered yet.</p>
                <p className="mt-2" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '16px' }}>Create tasks and organize your to-do items.</p>
              </div>
            ) : (
              <div className="space-y-3 text-left">
                {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#262626] border border-zinc-700 rounded-lg p-4 flex items-center gap-3 hover:bg-zinc-700 transition-colors"
                >
                
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? `bg-${task.color} border-${task.color} text-white`
                        : `hover:border-${task.color}`
                    }`}
                    style={task.completed 
                      ? { backgroundColor: task.color, borderColor: task.color } 
                      : { borderColor: task.color }
                    }
                  >
                    {task.completed && '✓'}
                  </button>
                  <span className={`flex-1 ${
                    task.completed ? 'text-gray-500 line-through' : 'text-white'
                  }`}>
                    {task.title}
                  </span>
                  <button
                    onClick={() => router.push(`/add-task?id=${task.id}&title=${encodeURIComponent(task.title)}&color=${encodeURIComponent(task.color)}&edit=true`)}
                    className="text-gray-500 hover:text-blue-400 transition-colors p-1 mr-2"
                  >
                    <EditIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors p-1"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            )
          ) : (
            /* Completed Tab - Show completion summary */
            completedTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-zinc-400 mt-20">
                <div className="mb-4">
                  <Image src="/clipboard.svg" width={48} height={48} alt="Clipboard" />
                </div>
                <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}>No completed tasks yet.</p>
                <p className="mt-2" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '16px' }}>Complete some tasks to see them here.</p>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircleIcon 
                  style={{ fontSize: 80, color: '#4ADE80' }} 
                  className="mb-4"
                />
                <p className="text-2xl font-semibold text-green-400 mb-2">
                  {completedTasks.length} of {tasks.length} tasks completed!
                </p>
                <p className="text-gray-400 mb-8">
                  {Math.round((completedTasks.length / tasks.length) * 100)}% progress
                </p>
                <div className="space-y-3 text-left">
                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-[#262626] border border-zinc-700 rounded-lg p-4 flex items-center gap-3 hover:bg-zinc-700 transition-colors"
                    >
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: task.color }}
                      />
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors text-white"
                        style={{ backgroundColor: task.color, borderColor: task.color }}
                      >
                        ✓
                      </button>
                      <span className="flex-1 text-gray-500 line-through">
                        {task.title}
                      </span>
                      <button
                        onClick={() => router.push(`/add-task?id=${task.id}&title=${encodeURIComponent(task.title)}&color=${encodeURIComponent(task.color)}&edit=true`)}
                        className="text-gray-500 hover:text-blue-400 transition-colors p-1 mr-2"
                      >
                        <EditIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )
        )}
      </div>
    </main>
  );
}
