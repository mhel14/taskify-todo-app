import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ITodo } from '../types';

interface IProps {
  todo: ITodo;
  handleToggleTodo: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
  handleUpdateTodos: (todo: ITodo) => void;
  index: number;
}

const Todo: React.FC<IProps> = ({
  todo,
  handleToggleTodo,
  handleDeleteTodo,
  handleUpdateTodos,
  index,
}) => {
  const { task, isDone } = todo;
  const inputRef = useRef<HTMLInputElement>(null);

  const [isUpdatingTodo, setIsUpdatingTodo] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.task);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isUpdatingTodo]);

  const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUpdatedTodo(e.target.value);

  const handleUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();

    handleUpdateTodos({
      ...todo,
      task: updatedTodo,
    });
    setIsUpdatingTodo(false);
  };

  const renderTodoTextOrInput = () => {
    if (isUpdatingTodo) {
      return (
        <form className="grow" onSubmit={handleUpdateTodo}>
          <input
            ref={inputRef}
            type="text"
            value={updatedTodo}
            onChange={handleChangeTodo}
            className="border-b border-gray-400 outline-none py-2 w-full"
          />
        </form>
      );
    }
    return <p>{task}</p>;
  };

  const renderUndoIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
      />
    </svg>
  );

  const renderDoneIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );

  const renderDeleteIcon = () => (
    <span className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        onClick={() => handleDeleteTodo(todo.id)}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  );

  const renderEditIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <li
          className="text-violet-900 flex gap-2 justify-between content-center my-2 p-4 mh-14 bg-white rounded z-10"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isDone ? <s>{task}</s> : renderTodoTextOrInput()}
          <div className="flex gap-1">
            <span
              className="cursor-pointer"
              onClick={() => setIsUpdatingTodo(!isUpdatingTodo)}
            >
              {isUpdatingTodo && !isDone ? renderUndoIcon() : renderEditIcon()}
            </span>
            {renderDeleteIcon()}
            <span
              className="cursor-pointer"
              onClick={() => {
                if (isUpdatingTodo) return;

                handleToggleTodo(todo.id);
              }}
            >
              {todo.isDone ? renderUndoIcon() : renderDoneIcon()}
            </span>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Todo;
