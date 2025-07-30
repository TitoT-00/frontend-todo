'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTask, updateTask, checkBackendAvailability } from '@/lib/api';
export default function AddTaskPage() {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check if backend is available when the page loads
  useEffect(() => {
    const checkBackend = async () => {
      const isBackendAvailable = await checkBackendAvailability();
      if (!isBackendAvailable) {
        setError('Cannot connect to the database. Please make sure the backend server is running at http://localhost:3001');
      }
    };
    
    checkBackend();
  }, []);
  
  useEffect(() => {
    // Check if we're in edit mode
    const edit = searchParams.get('edit');
    const id = searchParams.get('id');
    const taskTitle = searchParams.get('title');
    const taskColor = searchParams.get('color');
    
    if (edit === 'true' && id && taskTitle && taskColor) {
      setIsEditMode(true);
      setTaskId(parseInt(id));
      setTitle(decodeURIComponent(taskTitle));
      setSelectedColor(decodeURIComponent(taskColor));
    }
  }, [searchParams]);

  const COLOR_OPTIONS = [
    '#EF4444', // red
    '#F59E0B', // orange  
    '#FACC15', // yellow
    '#4ADE80', // green
    '#22D3EE', // cyan
    '#3B82F6', // blue
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#A78B61', // brown
  ];

  const handleTaskAction = async () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    // Validate hex color format
    const hexColorRegex = /^#[0-9A-F]{6}$/i;
    if (!hexColorRegex.test(selectedColor)) {
      alert('Color must be a valid hex color code (e.g., #FF5733)');
      return;
    }
    
    try {
      if (isEditMode && taskId !== null) {
        // Update existing task
        await updateTask(taskId, { title: title.trim(), color: selectedColor });
        alert('Task updated successfully!');
      } else {
        // Create new task
        await createTask(title.trim(), selectedColor);
      }
      router.push('/');
    } catch (error) {
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} task:`, error);
      alert(`Failed to ${isEditMode ? 'update' : 'create'} task. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Header */}
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div>{error}</div>
              <button 
                onClick={() => router.push('/')}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-4"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
        {/* Add Task Form */}
        <div className="p-8">
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="text-white hover:text-gray-300 mb-6 flex items-center"
          >
            <ArrowBackIcon style={{ fontSize: 20 }} />
          </button>
          
          {/* Title Input */}
          <div className="mb-8">
            <label className="block text-sm text-blue-400 mb-3 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTaskAction()}
              placeholder="Ex. Brush your teeth"
              className="w-full px-4 py-3 rounded-lg bg-[#262626] border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </div>

          {/* Color Picker */}
          <div className="mb-8">
            <label className="block text-sm text-blue-400 mb-4 font-medium">Color</label>
            <div className="flex gap-4 flex-wrap justify-center">
              {COLOR_OPTIONS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full transition-all hover:scale-110 ${
                    selectedColor === color 
                      ? 'ring-4 ring-white ring-opacity-50 scale-110' 
                      : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Add/Update Task Button */}
          <button
            onClick={handleTaskAction}
            disabled={!title.trim()}
            className="w-full bg-[#1E6F9F] hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
          >
            {isEditMode ? 'Update Task' : 'Add Task'}
            <span className="text-xl">{isEditMode ? '✓' : '⊕'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
