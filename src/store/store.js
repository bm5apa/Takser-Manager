import create from 'zustand';

const useStore = create((set) => ({
  tasks: [
    {
      title: 'Learn react-router',
      isDone: true,
      id: 1,
      dueDate: '2024-08-08',
    },
    {
      title: 'Learn to create custom hooks',
      isDone: false,
      id: 2,
      dueDate: '2024-08-07',
    },
    {
      title: 'Learn to use context',
      isDone: true,
      id: 3,
      dueDate: '2024-08-30',
    },
    {
      title: 'Learn to implement auth',
      isDone: false,
      id: 4,
      dueDate: '2025-01-25',
    },
  ],
  filter: 'all',
  searchQuery: '',
  addTask: (title, dueDate) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { title, isDone: false, id: Date.now(), dueDate },
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
    const state = useStore.getState();
    const { tasks, filter, searchQuery } = state;

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
}));

export default useStore;
