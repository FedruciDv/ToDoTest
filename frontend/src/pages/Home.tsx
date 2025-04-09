import React, { useEffect, useState } from "react";
import { completeToDo, createTodo, deleteTodo, getAllTodo, ToDo } from "../utils/api";

export default function Home() {
  const [todos, setTodos] = useState<ToDo[]>();
  const [title, setTitle] = useState<string>("");
  const [role, setRole] = useState<string>(localStorage.getItem("role") || "user");

  async function handleGetTodo() {
    try {
      const todo = await getAllTodo();
      setTodos(todo);
    } catch (err) {
      console.log("Errore nel caricamento todos");
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      const todo = await deleteTodo(id);
      await handleGetTodo();
    } catch (err) {
      console.log("Errore nel caricamento todos");
    }
  }

  async function handleCreateTodo() {
    try {
      const todo = await createTodo(title);
      await handleGetTodo();
    } catch (err) {
      console.log("Errore nel caricamento todos");
    }
  }

  async function handleCompleteToDo(id: number) {
    try {
      const todo = await completeToDo(id);
      await handleGetTodo();
    } catch (err) {
      console.log("Errore nel caricamento todos");
    }
  }

  useEffect(() => {
    handleGetTodo();
  }, []);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data creazione</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.completed ? "Completato" : "Non completato"}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => { handleDeleteTodo(item.id); handleGetTodo(); }}>Elimina</button>
                  <button onClick={() => { handleCompleteToDo(item.id); handleGetTodo(); }}>Completa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h4>Aggiungi todo</h4>
      <input type="text" value={title} onChange={(e) => { setTitle(e.currentTarget.value); }} />
      <button type="submit" onClick={handleCreateTodo}>Crea</button>

      <h3>Ruolo: {role === "admin" ? "Amministratore" : "Utente"}</h3>
      <button type="submit" onClick={() => setRole("admin")}>Admin</button>
      <button type="submit" onClick={() => setRole("user")}>Utente</button>
    </>
  );
}
