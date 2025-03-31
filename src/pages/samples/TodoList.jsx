import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createRestTemplate, withBookmarkEnabler } from "inzi-mes-platform-frontend-framework";

const restTemplate = createRestTemplate();

export const TodoList = (props)=>{
    const { onCurrentPage } = props;
    const location = useLocation();
    const[todoList, setTodoList] = React.useState([]);

    console.log("location.pathname==>" + JSON.stringify(location));

    React.useEffect(()=>{
        console.log("TodoList 컴포넌트의 useEffect. state=>" + JSON.stringify(location.state));
        // restTemplate.get("http://localhost:8000/todo-list/ispark", (reply, error)=>{
        //     if(error===undefined) {
        //         setTodoList(reply);
        //     }
        // });
        onCurrentPage({
            pathName: "/todo-list",
            state: {
                param1: "param1",
                param2: "param2"
            }
        });
        return (()=>{
            console.log("exit to do list ui")
        })
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

export const TodoListWithBookmarkEnabler = withBookmarkEnabler(TodoList);

export default TodoListWithBookmarkEnabler;