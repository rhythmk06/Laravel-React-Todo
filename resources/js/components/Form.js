import React from 'react';

const Form = ({todos, todoItemsCount, name, eventInsert, eventGetInputValue, error}) => {
    return (
        <div>
            <h5>Add a new Todo.</h5>
            <form onSubmit = {(event) => eventInsert(event)} method="post">
                <div className="form-group">
                    <input 
                        className="form-control border-dark" 
                        type="text" name="name" 
                        value={name} id="name" 
                        onChange = {(event) => eventGetInputValue(event)}
                    />
                </div>
                <p className="text-danger">{error.status === 'true' ? error.msg : '' }</p>
                <div className="form-group">
                    <input className="btn btn-dark" type="submit" name="submit"/>
                </div>
            </form>
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center text-info my-5">
                        <h5 style={todoItemsCount >= 1 ? { display: 'block' } : { display: 'none' }}>(Double click on todo you want to edit)</h5>
                        <h5 style={todoItemsCount == 0 ? { display: 'block' } : { display: 'none' }}>No Todo at the moment. Add something now!</h5>
                    </div>
                </div>
            </div>  
        </div>
    )

}

export default Form
