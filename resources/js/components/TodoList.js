import React from 'react';

const TodoList = ({todos, eventDelete, updatedName, eventShowEditForm, getTodoId, eventUpdatedName, eventUpdate,eventCancelEdit}) => { 
    let showAllTodos;
    showAllTodos = todos.map(todo => {
        return (
            <div className="col-md-4" key={todo.id}> 
                <div className="card my-2 border-dark">
                    <div className="card-body bg-dark">
                        <div style={todo.id === getTodoId ? { display: 'block' } : { display: 'none' }}>
                            <input 
                                className="form-control border-dark" 
                                type="text" 
                                name="updatedName" 
                                value={updatedName !== '' ? updatedName : todo.name} 
                                id={'input' + todo.id} onChange={(event) => eventUpdatedName(event)} 
                            />
                            <button 
                                onClick={(event) => eventUpdate(event, todo)} 
                                className="my-2 btn btn-sm btn-success" 
                                disabled ={updatedName === "" ? 'disabled' : '' }>Update
                            </button>
                            <button 
                                onClick={() => eventCancelEdit()} 
                                className="my-2 mx-2 btn btn-sm btn-warning">Cancel
                            </button>
                        </div>
                        <div style={todo.id === getTodoId ? { display: 'none' } : { display: 'block' }}>
                            <p 
                                className="text-white" 
                                style={{userSelect: 'none', cursor: 'pointer'}} 
                                onDoubleClick={() => eventShowEditForm(todo)}>{todo.name}
                            </p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button 
                            className="btn btn-danger" 
                            onClick={(event) => eventDelete(event, todo)}>Delete
                        </button>
                    </div>
                </div>
            </div> 
        );
    }) 
   
    return (
        <>
        <div className="row">{showAllTodos ?? ''}</div>

        
        </>
    );
}

export default TodoList
