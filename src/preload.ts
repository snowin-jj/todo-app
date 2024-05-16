import {ipcActions} from "./ipcHandlers";
import {contextBridge, ipcRenderer} from 'electron';

const WINDOW_API = {
    getTodos: () => ipcRenderer.invoke(ipcActions.GET_TODOS),
    addTodo: (content: string) => ipcRenderer.invoke(ipcActions.ADD_TODO, content),
    deleteTodo: (todoId: number) => ipcRenderer.invoke(ipcActions.REMOVE_TODO, todoId),
}

declare global {
    interface Window {
        api: typeof WINDOW_API,
    }
}

contextBridge.exposeInMainWorld('api', WINDOW_API);
