import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Todo from './Todo';
import { ITodo } from '../types';

interface IProps {
  todos: ITodo[];
  handleToggleTodo: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
  handleUpdateTodos: (todo: ITodo) => void;
  droppableId: string;
}

const Todos: React.FC<IProps> = ({
  todos,
  handleToggleTodo,
  handleDeleteTodo,
  handleUpdateTodos,
  droppableId,
}) => {
  const [enabled, setEnabled] = useState(false);

  // Hack for Drag and Drop not working issue
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  return (
    <>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {todos?.map((todo, index) => {
              return (
                <Todo
                  key={todo.id.toString()}
                  todo={todo}
                  index={index}
                  handleToggleTodo={handleToggleTodo}
                  handleDeleteTodo={handleDeleteTodo}
                  handleUpdateTodos={handleUpdateTodos}
                />
              );
            })}
          </ul>
        )}
      </Droppable>
    </>
  );
};

export default Todos;
