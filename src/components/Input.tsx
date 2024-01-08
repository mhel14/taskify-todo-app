interface IProps {
  handleAddTodo: (e: React.FormEvent) => void;
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<IProps> = ({ handleAddTodo, todo, setTodo }) => {
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  return (
    <div className="mb-4">
      <form
        onSubmit={handleAddTodo}
        className="flex h-16 w-full justify-center items-center relative"
      >
        <input
          className="w-full py-5 px-8 pr-1/6 text-black z-10"
          placeholder="Enter a todo"
          type="text"
          name="todoInput"
          id=""
          value={todo}
          onChange={handleTodoChange}
        />
        <button className=" w-1/6 h-full bg-violet-900">Save</button>
      </form>
    </div>
  );
};

export default Input;
