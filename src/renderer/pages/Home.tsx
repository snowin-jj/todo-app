import TodoItem from "../components/TodoItem";
import {useEffect, useState} from "react";

export type Todo = {
    id: number;
    content: string;
}

export default function HomePage() {
    const [todos, setTodos] = useState<Todo[]>()

    useEffect(() => {
        (async () => {
            const data = await window.api.getTodos();
            setTodos(JSON.parse(data))
        })()
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const content = formData.get("content");
        if (!content) return;
        const todo = await window.api.addTodo(String(content))
        setTodos(prev => prev.concat(JSON.parse(todo)))
        form.reset()
    }

    async function handleDelete(todoId: number) {
        try {
            const res = await window.api.deleteTodo(todoId);
            setTodos(prevState => prevState.filter((todo) => todo.id !== todoId))
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="max-w-xl mx-auto flex flex-col items-center pt-10 min-h-screen">
            <form className="flex gap-4" onSubmit={handleSubmit}>
                <input type="text" name="content" className="w-96 border-2 py-2 px-4 rounded-md"
                       placeholder="What's your todo?"/>
                <button className="bg-purple-500 px-4 py-2 rounded-md">Add</button>
            </form>
            <div className="my-8 w-full flex flex-col gap-4">
                {todos?.map(todo => (
                    <TodoItem key={todo.id} todo={todo} handleDelete={handleDelete}/>
                ))}
            </div>
        </main>
    )
}