import { TaskerCollection, TaskerInput } from 'components';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TaskerPage = () => {
  return (
    <div>
      Tasker Manager
      <TaskerInput />
      <TaskerCollection />
    </div>
  );
};

export default TaskerPage;
