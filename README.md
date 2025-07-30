# Todo App

A modern, feature-rich Todo application built with Next.js, featuring a clean UI with dark theme and blue accent colors. This app helps you organize your tasks with color coding, completion tracking, and a user-friendly interface.

## Features

- **Clean, Modern UI**: Dark theme with blue accent colors and the Inter font family
- **Task Management**: Create, edit, and delete tasks easily
- **Color Coding**: Assign different colors to tasks for visual organization
- **Completed Tasks Tab**: Track your progress with a dedicated tab for completed tasks
- **Dynamic Checkboxes**: Checkbox colors match the task's selected color
- **Visual Feedback**: Empty states with helpful messages and icons
- **Responsive Design**: Works well on various screen sizes

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend-todo
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Backend Setup

This Todo App is configured to work with a separate backend server running on port 3002. Make sure your backend server is running and accessible at http://localhost:3001 with the following endpoints:

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update an existing task
- `DELETE /tasks/:id` - Delete a task

## Key Features Explained

### Color-Coded Tasks

When creating or editing a task, you can select from multiple colors. The selected color is used for:
- The checkbox outline when the task is not completed
- The checkbox fill when the task is completed
- Visual identification of tasks in the list

### Task Management

- **Create Task**: Click the "+ Create task" button to add a new task
- **Edit Task**: Click the edit icon (pencil) next to any task to modify its title or color
- **Delete Task**: Click the trash icon to remove a task
- **Complete Task**: Click the checkbox to mark a task as completed

### Tabs Navigation

- **Tasks Tab**: Shows all tasks with completed tasks crossed out
- **Completed Tab**: Shows your completion ratio (e.g., "2 of 5") and lists only completed tasks

## Technologies Used

- **Next.js**: React framework for the frontend
- **Tailwind CSS**: For styling
- **Material-UI Icons**: For UI icons
- **Inter Font**: For typography (weight 400, 700, and 900)
- **SVG Assets**: Custom icons for enhanced visual appeal

