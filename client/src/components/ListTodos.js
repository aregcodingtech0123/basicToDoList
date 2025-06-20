import React,{Fragment,useEffect,useState} from "react";
import EditTodo from './EditTodo'
import InputTodo from "./InputTodo";
const ListTodos=()=>{
    const [todos,setTodos]=useState([]) //because of a json obj is array
    const getTodos=async()=>{
        try {
            const response=await fetch("http://localhost:5000/todos")//fetch's method is 'GET' by default 
            const jsonData= await response.json()
            setTodos(jsonData)
        } catch (error) {
            console.log(error.message)
        }
    }
    //deleting
    const deleteTodo=async(id)=>{
        try {
            const deleteTodo=await fetch(`http://localhost:5000/todos/${id}`,{
                method:"DELETE"
            });
            setTodos(todos.filter(todo=>todo.todo_id!==id))
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        getTodos();
    },[])
    return(
        <Fragment>
            <InputTodo setTodos={setTodos}/>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo=>{
                        return(
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td><EditTodo todo={todo} setTodos={setTodos}/></td>
                                <td><button className="btn btn-danger" onClick={()=>{deleteTodo(todo.todo_id)}}>Delete</button></td>
                            </tr>
                        );

                    })}
                </tbody>
            </table>
        </Fragment>
    );
}
export default ListTodos;