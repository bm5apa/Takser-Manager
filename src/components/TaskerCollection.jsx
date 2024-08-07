import React from 'react';
import useStore from '../store/store';
import TaskerItem from './TaskerItem';

const TaskerCollection = () => {
  const { tasks, filter, searchQuery } = useStore((state) => ({
    tasks: state.tasks,
    filter: state.filter,
    searchQuery: state.searchQuery,
  }));

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.isDone;
      if (filter === 'today') {
        const today = new Date().toISOString().slice(0, 10);
        return task.dueDate === today;
      }
      if (filter === 'thisWeek') {
        const today = new Date();
        const startOfWeek = today.getDate() - today.getDay();
        const endOfWeek = startOfWeek + 6;
        const start = new Date(today.setDate(startOfWeek))
          .toISOString()
          .slice(0, 10);
        const end = new Date(today.setDate(endOfWeek))
          .toISOString()
          .slice(0, 10);
        return task.dueDate >= start && task.dueDate <= end;
      }
      if (filter === 'thisMonth') {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .slice(0, 10);
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0,
        )
          .toISOString()
          .slice(0, 10);
        return task.dueDate >= startOfMonth && task.dueDate <= endOfMonth;
      }
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div>
      {filteredTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <TaskerItem
              key={task.id}
              id={task.id}
              title={task.title}
              isDone={task.isDone}
              dueDate={task.dueDate}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskerCollection;
