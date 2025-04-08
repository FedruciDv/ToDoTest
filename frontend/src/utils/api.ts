import axios from "axios";
import { url } from "./apiUrl";

export interface ToDo{
    id : number,
    title: string,
    completed: boolean,
    createdAt : Date
}

export async function getAllTodo(): Promise<ToDo[]> {
    try {
      const res = await axios.get(`${url}/todos`);
      return res.data.data; 
    } catch (err) {
      throw new Error("Impossibile recuperare la lista dei TODO");
    }
  }
export async function deleteTodo(id : number): Promise<ToDo[]> {
    try {
      const res = await axios.post(`${url}/todos/delete`, {id});
      return res.data.data; 
    } catch (err) {
      throw new Error("Impossibile eiminare item TODO");
    }
}
export async function createTodo(title : string): Promise<ToDo[]> {
    try {
      const res = await axios.post(`${url}/todos/create`, {title});
      return res.data.data; 
    } catch (err) {
      throw new Error("Impossibile eiminare item TODO");
    }
}
export async function completeToDo(id : number): Promise<ToDo[]> {
    try {
      const res = await axios.post(`${url}/todos/complete`, {id});
      return res.data.data; 
    } catch (err) {
      throw new Error("Impossibile eiminare item TODO");
    }
}