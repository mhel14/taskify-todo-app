import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Input from './components/Input';
import Todos from './components/Todos';
import { ITodo } from './types';

const todosShape = [
  {
    id: 1,
    task: 'Write code!',
    isDone: false,
  },
  {
    id: 2,
    task: 'Learn how to build chrome/browser extension stuff',
    isDone: false,
  },
];

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<ITodo[]>(todosShape);
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo.trim().length) {
      setTodos([
        ...todos,
        {
          id: new Date().getTime(),
          task: todo,
          isDone: false,
        },
      ]);
      setTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)),
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodos = (updatedTodo: ITodo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    let add;
    const activeTodos = todos;
    const completed = completedTodos;
    // Source Logic
    if (source.droppableId === 'activeList') {
      add = activeTodos[source.index];
      activeTodos.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === 'activeList') {
      activeTodos.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }

    setCompletedTodos(completed);
    setTodos(activeTodos);
  };

  const renderBlobBackground = () => (
    <>
      <div className="absolute top-0 -left-14 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
    </>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center min-h-screen bg-gradient-to-r from-purple-800 via-pink-700 via-75% to-red-600 to-91% text-white text-center">
        <div className="w-4/5">
          <h1 className="font-cursive1 text-4xl my-8">Taskify</h1>
          <Input todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
          <div className="grid grid-cols-2 gap-4 justify-between">
            <div className="relative text-left backdrop-blur-sm bg-gray-50/30 rounded-md">
              {renderBlobBackground()}
              <div className="relative w-11/12 flex flex-col p-6 pb-8 m-auto content-center">
                <h3 className="font-subHeading font-bold text-3xl mb-4 ">Active Task</h3>
                <Todos
                  todos={todos}
                  handleUpdateTodos={handleUpdateTodos}
                  handleToggleTodo={handleToggleTodo}
                  handleDeleteTodo={handleDeleteTodo}
                  droppableId="activeList"
                />
              </div>
            </div>
            <div className="backdrop-blur-sm bg-violet-900 p-6 text-left">
              <div className="w-11/12 m-auto">
                <h3 className="font-subHeading font-bold text-3xl mb-4">
                  Completed Task &nbsp; 🚀
                </h3>
                <Todos
                  todos={completedTodos}
                  handleUpdateTodos={handleUpdateTodos}
                  handleToggleTodo={handleToggleTodo}
                  handleDeleteTodo={handleDeleteTodo}
                  droppableId="completedList"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
