import create from 'zustand';

const useStore = create((set, get) => ({
  tasks: [
    {
      title: 'Learn about Basic Knowledge of React.js',
      isDone: true,
      id: 1,
      dueDate: '2024-08-08',
      comments: [
        { id: 1, text: 'Great progress!', date: '2024-08-01' },
        {
          id: 2,
          text: 'Remember to check official document.',
          date: '2024-08-03',
        },
      ],
    },
    {
      title: 'Learn about React Hooks',
      isDone: false,
      id: 2,
      dueDate: '2024-08-07',
      comments: [
        { id: 3, text: 'Consider using useReducer.', date: '2024-08-02' },
      ],
    },
    {
      title: 'Learn about Zustand',
      isDone: true,
      id: 3,
      dueDate: '2024-08-30',
      comments: [],
    },
    {
      title: 'Learn about useCallback',
      isDone: false,
      id: 4,
      dueDate: '2025-01-25',
      comments: [],
    },
  ],
  filter: 'all',
  searchQuery: '',
  addTask: (title, dueDate) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { title, isDone: false, id: Date.now(), dueDate, comments: [] },
      ],
    })),
  toggleTaskCompletion: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task,
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  editTask: (id, newTitle, newDueDate) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, dueDate: newDueDate }
          : task,
      ),
    })),
  setFilter: (filter) => set({ filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  getFilteredTasks: () => {
    const { tasks, filter, searchQuery } = get();

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const lowerCaseQuery = searchQuery.toLowerCase();

    return tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const isQueryMatch = task.title.toLowerCase().includes(lowerCaseQuery);
      switch (filter) {
        case 'today':
          return (
            dueDate.toDateString() === today.toDateString() && isQueryMatch
          );
        case 'thisWeek':
          return dueDate >= startOfWeek && dueDate <= endOfWeek && isQueryMatch;
        case 'thisMonth':
          return (
            dueDate >= startOfMonth && dueDate <= endOfMonth && isQueryMatch
          );
        case 'completed':
          return task.isDone && isQueryMatch;
        default:
          return isQueryMatch;
      }
    });
  },
  addComment: (taskId, text) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              comments: [
                ...task.comments,
                {
                  id: Date.now(),
                  text,
                  date: new Date().toISOString().slice(0, 10),
                },
              ],
            }
          : task,
      ),
    })),
  editComment: (taskId, commentId, newText) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              comments: task.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, text: newText }
                  : comment,
              ),
            }
          : task,
      ),
    })),
  deleteComment: (taskId, commentId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              comments: task.comments.filter(
                (comment) => comment.id !== commentId,
              ),
            }
          : task,
      ),
    })),
}));

export default useStore;
