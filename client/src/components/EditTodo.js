import React, { useState } from "react";

const EditTodo = ({todo,setTodos}) => {
    const [description,setDescription]=useState(todo.description)

    const updateDescription=async (e) => {
        e.preventDefault()
        try {
            const body={description}
            const response=await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            setTodos((prevTodos) =>
                prevTodos.map((t) =>
                    t.todo_id === todo.todo_id ? { ...t, description } : t 
                )
            );
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <>
            <button 
                type="button" 
                className="btn btn-warning" 
                data-bs-toggle="modal" 
                data-bs-target={`#id${todo.todo_id}`}
            >
                Edit
            </button>

            {/* The Modal */}
            <div className="modal fade" id={`id${todo.todo_id}`} tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">Modal Heading</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal body */}
                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} onChange={e=>{
                                setDescription(e.target.value)
                            }}>                           
                            </input>
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={updateDescription}>Edit</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTodo;
