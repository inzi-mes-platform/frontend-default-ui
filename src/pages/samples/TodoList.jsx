import React from 'react';
import { Link } from 'react-router-dom';

// import { createRestTemplate } from "./framework/utils/RestTemplate";

// const restTemplate = createRestTemplate();

const TodoList = (props)=>{
    
    const[todoList, setTodoList] = React.useState([]);

    React.useEffect(()=>{
        // restTemplate.get("http://localhost:8000/todo-list/ispark", (reply, error)=>{
        //     if(error===undefined) {
        //         setTodoList(reply);
        //     }
        // });
    },[]);

    return(
        <div>
            <h4>Todo List</h4>
            <ul>
            { todoList && todoList.map((task, index)=>{
                    return (
                        <Link to={ task.formKey } state={{ task }}><li key={ index }>{ task.taskName }</li></Link>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default TodoList;