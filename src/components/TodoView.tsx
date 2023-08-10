import { useState } from "react";
import { Todo } from "../lib/types";

const TodoView = ({
  todo,
  onEdit,
}: {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}) => {
  const [editing, setEditing] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const toggleEditing = (): void => {
    setEditing(!editing);
  };

  const editTodo = () => {
    if (!title) return;

    todo.title = title;
    todo.content = content;

    onEdit(todo);
    toggleEditing();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (!value) return;
    setTitle(value);
  };

  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const value = e.target.value;
    if (!value) return;
    setContent(value);
  };

  return (
    <article
      id="todo-{todo.id}"
      className="flex w-full gap-3 rounded border border-black px-3 py-2"
    >
      <div className="flex w-full flex-col gap-2">
        {editing ? (
          <>
            <input
              type="text"
              className="border-b border-black text-xl font-bold"
              defaultValue={todo.title}
              onChange={handleInputChange}
            />
            <textarea
              rows={2}
              className="border-b border-black"
              defaultValue={todo.content}
              onChange={handleTextAreaChange}
            />
          </>
        ) : (
          <>
            <h1 className="border-b border-white text-xl font-bold">
              {todo.title}
            </h1>
            <p className="border-b border-white">{todo.content}</p>
          </>
        )}
      </div>
      <div className="flex flex-col justify-center">
        {editing ? (
          <button className=" text-blue-500 underline" onClick={editTodo}>
            Save
          </button>
        ) : (
          <button className=" text-blue-500 underline" onClick={toggleEditing}>
            Edit
          </button>
        )}
      </div>
    </article>
  );
};

export default TodoView;
