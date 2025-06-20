import React, { Fragment ,useState} from "react";

const InputTodo=({setTodos})=>{

    const [description,setDescription]=useState("")
    const onSubmitForm=async(e)=>{
        e.preventDefault()
        try {
            if(description.trim() === ""){alert("Please do not enter an empty value.");return;}
            const body={description}
            
            const response=await fetch("http://localhost:5000/todos",{
                method:"POST", 
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body) //we converted the data into JSON format

            });
            if (response.ok) {
                const newTodo = await response.json();
                setTodos((prevTodos) => [...prevTodos, newTodo]); // adding the new todo into the todo list
                setDescription(""); // Input'u temizliyoruz
            }
            
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" onChange={e=>setDescription(e.target.value)} value={description}/>
                <button className="btn btn-success" >Add</button>
            </form>
        </Fragment>
    );
}

export default InputTodo; 