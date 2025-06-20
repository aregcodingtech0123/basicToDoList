import React,{useState} from "react";

export default function getATodo(){
    const [todo,setTodo]=useState("")   
    const [id,setID]=useState("")
    const getInfoAboutTodo=async() => {
        try {
            const response=await fetch(`https://localhost:3000/todos/${id}`)
            if(!response.ok){
                const errorData=await response.json()
                throw new Error(errorData.message || "Error fetching todo.");
            }
            const data=await response.json() 
            setTodo(data)
            setID(data.id)
            
        } catch (error) {
            console.log(error.message)
        }
    }
    return(
        <>
            <h2>Get Info About A Todo</h2>
            <form onSubmit={getInfoAboutTodo}>
                <input value={id} onChange={(e)=>{setID(e.target.value)}}></input>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Description</td>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>{todo.todo_id}</td>
                            <td>{todo.description}</td>
                        </tr>
                    </tbody>
                </table>
            </form>        
        </>
    )
}

