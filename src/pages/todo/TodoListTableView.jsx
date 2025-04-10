import React from 'react';

import { 
    Box,
    Checkbox,
    Divider,
    Table, 
    TableCell, 
    TableHead, 
    TableContainer, 
    TableBody,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { GlobalAlertContext as AlertContext } from 'inzi-mes-platform-frontend-framework';

import { deleteTodoByName, updateTodo } from './TodoApi';
import TodoListTableRow from './TodoListTableRow';

const TodoListTableView = (props) => {

    const theme = useTheme();

    const { Notifier } = React.useContext(AlertContext);

    const [todoList, setTodoList] = React.useState(props.todoList);
    const [selectedAll, setSelectedAll] = React.useState(false);

    React.useEffect(()=>{
        setTodoList(props.todoList);
        setSelectedAll(false);
    }, [props.todoList]);

    const handleOnAllCheckboxClicked = (e) => {
        for(var i=0;i<todoList.length;i++) todoList[i].selected=!selectedAll;
        setSelectedAll(!selectedAll);
    }

    const handleOnSelectedTodo = (seq, selected) => {
        todoList[seq].selected=selected;
        var found=false;
        todoList.forEach((v,i)=>{
            if(!v.selected) {
                found=true;
                return;
            }
        });
        if(!found) setSelectedAll(true);
        else setSelectedAll(false);
    }

    const handleOnDelete = (id, name) => {
        deleteTodoByName(name, (resp, error)=>{
            if(error===undefined) {
                props.onDeleted();
            } else {
                Notifier.warn({ title: "Fail Todo deletion", message: "Failed deletion of Todo["+name+"]", modal: true });
            }
        });
    }

    const handleOnUpdate = (todoInfo) => {
        updateTodo(todoInfo, (resp, error)=>{
            if(error===undefined) {
                props.onUpdated();
                Notifier.info({ title: "Success to update Todo", message: "Success to update Todo [ " + todoInfo.name + " ]", modal: false })
            } else {
                Notifier.warn({ title: "Fail to update Todo", message: "Fail to update Todo [ " + todoInfo.name + " ]", modal: true })
            }
        });
    }

    const handleOnTodoUpdated = (idx, todo) => {
        todoList[idx]=todo;
        setTodoList([ ...todoList ]);
    }

    return (
        <TableContainer>
            <Box sx={{ m:0, p:0, mt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant='h7'>{ props.title } ( { props.count } )</Typography>
                    </Box>
                    <Box sx={{ m: 0, mt: 0, pr: 0 }}>
                    { props.operButtons }
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ mt: 1}} />
            <div>
            <Table stickyHeader>
                <TableHead>
                    <TableRow sx={{ height: "45px" }}>
                        <TableCell type="small" padding='checkbox'>
                            <Checkbox 
                                checked={ selectedAll }
                                onClick={ handleOnAllCheckboxClicked }
                                size='small'
                            />
                        </TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>이름</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>할당</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }} align='center'>완료여부</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>일시</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>설명</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>삭제</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>수정</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    todoList&&todoList.map((todo, index)=>{
                        return(
                            <TodoListTableRow
                                key = { "todo-" + index }
                                seq = { index }
                                todo = { todo }
                                selected={ todo.selected===undefined ? false : todo.selected }
                                onSelected={ handleOnSelectedTodo }
                                onRowUpdated={ handleOnTodoUpdated }
                                onDelete={ handleOnDelete }
                                onUpdate={ handleOnUpdate }
                            />
                        )
                    })
                }
                </TableBody>
            </Table>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <TablePagination
                    onPageChange={()=>console.log("") }
                    page={ 1 }
                    rowsPerPage={ 10 }
                    count={ 100 }
                    onRowsPerPageChange={()=>console.log("")}
                    showFirstButton
                    showLastButton
                />
            </div>
        </TableContainer>
    )
}

export default TodoListTableView;