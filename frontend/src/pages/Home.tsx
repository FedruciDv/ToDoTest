import React, { useEffect, useRef, useState } from "react";
import { completeToDo, createTodo, deleteTodo, getAllTodo,ToDo } from "../utils/api";

export default function Home(){

    const [todos,setTodos]=useState<ToDo[]>();
    const [title,setTitle]=useState<string>("");
    async function handleGetTodo(){
        try{
            const todo= await getAllTodo();
            setTodos(todo)
        }catch(err){
            console.log("Errore nel caricamento todos");
        }
    }
    async function handleDeleteTodo(id : number){
        try{
            const todo= await deleteTodo(id);
            await handleGetTodo()
        }catch(err){
            console.log("Errore nel caricamento todos");
        }
    }
    async function handleCreateTodo(){
        try{
            const todo= await createTodo(title);
            await handleGetTodo()
        }catch(err){
            console.log("Errore nel caricamento todos");
        }
    }
    async function handleCompleteToDo(id : number){
        try{
            const todo= await completeToDo(id);
            await handleGetTodo()
        }catch(err){
            console.log("Errore nel caricamento todos");
        }
    }
    useEffect(()=>{
        handleGetTodo();

    },[])

    

    return(<>
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Nome
                    </th>
                    <th>
                       Stato
                    </th>
                    <th>
                        Data creazione
                    </th>
                    <th>
                        Azioni
                    </th>
                </tr>
            </thead>
            <tbody>
               {
                todos?.map((item,index)=>{
                    return(
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.completed? "Completato" : "Non completato"}</td>
                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={()=>{handleDeleteTodo(item.id)}}> Elimina </button>
                                    <button onClick={()=>{handleCompleteToDo(item.id)}}> Completa </button>
                                </td>
                        </tr>
                     
                    )
                })
               }
            </tbody>
        </table>

        <h4>Aggiungi todo</h4>
            <input type="text" value={title}  onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
            <button type="submit" onClick={handleCreateTodo}>Crea</button>

            <h3>Ruolo: {localStorage.get("role")=="admin"?"Amministratore":"Utente"}</h3>
            <button type="submit" onClick={()=>{localStorage.setItem("role","admin")}}>Admin</button> 
            <button type="submit" onClick={()=>{localStorage.setItem("role","user")}}>Utente</button>

    </>)
}