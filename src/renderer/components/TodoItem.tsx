import {Todo} from "../pages/Home";

type TodoItemProps = {
    todo: Todo
    handleDelete: (todoId: number) => Promise<void>;
}
export default function TodoItem({todo, handleDelete}: TodoItemProps) {
    return (
        <div className="border-2 p-6 w-full flex items-center justify-between rounded-md">
            <h4>{todo.content}</h4>
            <button onClick={async () => await handleDelete(todo.id)} className="text-lime-500 underline">Remove
            </button>
        </div>
    )
}