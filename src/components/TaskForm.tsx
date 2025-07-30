'use client';

import { useState } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';

type TaskFormProps = {
  mode: 'create' | 'edit';
  initialData?: {
    title: string;
    color: string;
  };
};

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

export default function TaskForm({ mode, initialData }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [color, setColor] = useState(initialData?.color || COLOR_OPTIONS[0]);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, color };
    if (mode === 'create') {
      console.log('Creating task:', data);
      // TODO: Send POST to API
    } else {
      console.log('Editing task:', data);
      // TODO: Send PUT to API
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg max-w-xl mx-auto mt-12 space-y-6"
    >
      {/* Back Arrow */}
      <button
        type="button"
        onClick={() => router.back()}
        className="text-zinc-400 hover:text-white"
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </button>

      {/* Title Input */}
      <div>
        <label className="block text-sm text-zinc-300 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Ex. Brush your teeth"
          className="w-full px-4 py-2 rounded-md bg-[#262626] border border-zinc-700 text-white"
          required
        />
      </div>

      {/* Color Picker */}
      <div>
        <label className="block text-sm text-zinc-300 mb-2">Color</label>
        <div className="flex gap-3 flex-wrap">
          {COLOR_OPTIONS.map(c => (
            <button
              key={c}
              type="button"
              className={`w-8 h-8 rounded-full border-2 transition ${
                color === c ? 'border-white' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-[#1E6F9F] hover:bg-blue-700 w-full py-3 text-white rounded-md flex justify-center items-center gap-2"
      >
        {mode === 'create' ? 'Add Task' : 'Save Task'}
        <ControlPointIcon fontSize="small" />
      </button>
    </form>
  );
}
