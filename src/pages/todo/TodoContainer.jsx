import React from 'react';

import {
    Button,
    Tooltip
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import GeneralContainerTemplate from '../GeneralContainerTemplate';
import TodoAddDialog from './TodoAddDialog';
import TodoListTableView from './TodoListTableView';
import TodoSearchView from './TodoSearchView';

const TodoConteiner = (props) => {

    const [todoAddDialogOpen, setTodoAddDialogOpen] = React.useState(false);
    const [todoList, setTodoList] = React.useState([]);
    const [reload, setReload] = React.useState(true);

    const handleOnBatchDeletion = () => {
        // TO-DO
    }

    const handleOnBatchOperation = () => {
        // TO-DO
    }

    const handleOnTodoListChange = (todos) => {
        setTodoList(todos);
        setReload(false);
    }

    const handleOnSearchTodo = () => {
        setReload(true);
    }

    return (
        <GeneralContainerTemplate
            searchView = {
                <TodoSearchView 
                    hideSearchBy = { false }
                    reloadSearch = { reload }
                    onTodoListChange= { handleOnTodoListChange }
                />
            }
            listTableView = {
                <TodoListTableView
                    title = "Todo List"
                    count = { todoList.length }
                    style = {{ marginTop: 5 }}
                    todoList = { todoList }
                    onDeleted = { handleOnSearchTodo }
                    onUpdated = { handleOnSearchTodo }
                    operButtons = {[
                        <Tooltip title="TO-BE Developed">
                            <Button 
                                key="todo-batch-delete-button"
                                size="small" 
                                color="inherit" 
                                startIcon={<ClearAllIcon color='inherit'/>} 
                                variant='contained' 
                                sx={{ mr: 1 }}
                                onClick={ handleOnBatchOperation }
                                disabled
                            >
                                Batch update
                            </Button>
                        </Tooltip>,
                        <Tooltip title="TO-BE Developed">
                            <Button 
                                key="todo-batch-delete-button"
                                size="small" 
                                color="inherit" 
                                startIcon={<ClearAllIcon color='inherit'/>} 
                                variant='contained' 
                                sx={{ mr: 1 }}
                                onClick={ handleOnBatchDeletion }
                                disabled
                            >
                                Batch delete
                            </Button>
                        </Tooltip>,
                        <Button 
                            key="todo-addition-button"
                            size="small" 
                            color="inherit" 
                            startIcon={<AddCircleIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 0 }}
                            onClick={ ()=>setTodoAddDialogOpen(true) }
                        >
                            Add
                        </Button>
                    ]}
                />
            }
            addDialog={
                <TodoAddDialog 
                    open={ todoAddDialogOpen }
                    onClose={ ()=>setTodoAddDialogOpen(false) }
                    onAdditionCompleted={ ()=>setReload(true) }
                />
            }
        />
    )
}

export default TodoConteiner;