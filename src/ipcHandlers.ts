import {IpcMainInvokeEvent, ipcMain} from 'electron';
import knex from "./lib/db";

export const ipcActions = {
    ADD_TODO: 'ADD_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    GET_TODOS: 'GET_TODOS',
}

const ipcHandlers = [
    {
        event: ipcActions.ADD_TODO,
        callback: async (_: IpcMainInvokeEvent, content: string) => {
            try {
                const todo = await knex('todos').insert({content}, "*")
                console.log(todo)
                return JSON.stringify(todo[0]);
            } catch (err) {
                const e = err as Error;
                console.log(e);
                return "Failed to add todo";
            }
        },
    },
    {
        event: ipcActions.GET_TODOS,
        callback: async (_: IpcMainInvokeEvent) => {
            try {
                const todos = await knex('todos').select("*");
                return JSON.stringify(todos);
            } catch (err) {
                const e = err as Error;
                console.log(e)
                return "Failed to get todos";
            }
        }
    },
    {
        event: ipcActions.REMOVE_TODO,
        callback: async (_: IpcMainInvokeEvent, todoId: number) => {
            try {
                await knex('todos').where("id", todoId).del();
                return "Todo deleted successfully";
            } catch (err) {
                const e = err as Error;
                console.log(e)
                return "Failed to get todos";
            }
        }
    }
]

export const registerHandlers = () => {
    ipcHandlers.forEach(handler => {
        ipcMain.handle(handler.event, handler.callback)
    })
}