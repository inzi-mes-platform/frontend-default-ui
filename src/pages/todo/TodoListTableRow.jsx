import React from 'react';

import { 
    Checkbox, 
    IconButton, 
    InputAdornment,
    Switch,
    TableCell, 
    TableRow, 
    TextField,
    Tooltip, 
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useLongTextCommonDialogContext } from 'inzi-mes-platform-frontend-framework';

const TodoListTableRow = (props) => {

    const { showLongTextCommonDialog } = useLongTextCommonDialogContext();

    const [todoInfo, setTodoInfo] = React.useState(props.todo);
    const [selected, setSelected] = React.useState(false);
    const [nameOnFocus, setNameOnFocus] = React.useState(false);
    const [assigneeOnFocus, setAssigneeOnFocus] = React.useState(false);
    const [descOnFocus, setDescOnFocus] = React.useState(false);
    const [timestampOnFocus, setTimestampOnFocus] = React.useState(false);

    React.useEffect(()=>{
        setTodoInfo(props.todo);
    }, [props.todo]);

    React.useEffect(()=>{
        setSelected(props.selected);
        setTodoInfo({
            ...todoInfo,
            selected: props.selected
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selected]);

    React.useEffect(()=>{
        props.onSelected(props.seq, selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    const handleOnCheckboxClicked = (e) => {
        handleOnChange("selected", !selected)
        setSelected(!selected);
    }

    const handleOnChange = (propName, value) => {
        const temp={
            ...todoInfo,
            [propName]: value,
            selected: true,
            oper: "U"
        };
        setTodoInfo(temp);
        setSelected(true);
        props.onRowUpdated(props.seq, temp);
    }

    const handleOnUpdate = () => {
        props.onUpdate(todoInfo);
        setSelected(false);
    }

    const handleOnLongTextDialogConfirm = (val, kind) => {
        if(kind==="DESCRIPTION") {
            handleOnChange("description", val);
        } else if(kind==="SAMPLE_DATA") {
            handleOnChange("sampleData", val);
        }
    }

    const handleOnDescClick = () => {
        showLongTextCommonDialog({
            title: "Description",
            kind: "DESCRIPTION",
            editMode: true,
            text: todoInfo.description,
            isOpen: true,
            onConfirm: handleOnLongTextDialogConfirm
        });
    }

    const handleOnDescOnBlur = () => {
        const handle=setInterval(()=>{
            setDescOnFocus(false);
            clearInterval(handle);
        }, 500);
    }

    return (
        <TableRow sx={{ m: 0, p: 0 }} hover role="checkbox">
            <TableCell type="small" padding='checkbox' >
                <Checkbox 
                    checked={ selected | todoInfo.oper==="U" ? true : false }
                    onClick={ handleOnCheckboxClicked }
                    size='small'
                    color={ todoInfo.oper==="U" ? "success" : "error" }
                />
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <TextField 
                    value={ todoInfo.name }
                    onChange={ (e)=>handleOnChange("name", e.target.value) }
                    // sx={{ width: '30ch' }}
                    size="small"
                    InputProps={{ sx:{ fontSize: 14 }, disableUnderline: !nameOnFocus }}
                    variant='standard'
                    onFocus={ e=>setNameOnFocus(true) }
                    onBlur={ e=>setNameOnFocus(false) }
                    disabled
                />
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <TextField 
                    value={ todoInfo.assignee }
                    onChange={ (e)=>handleOnChange("assignee", e.target.value) }
                    // size="small"
                    InputProps={{ sx:{ fontSize: 14 }, disableUnderline: !assigneeOnFocus }}
                    variant='standard'
                    sx={{ minWidth: '25ch' }}
                    onFocus={ e=>setAssigneeOnFocus(true) }
                    onBlur={ e=>setAssigneeOnFocus(false) }
                />
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <Switch
                    defaultChecked={ todoInfo.cleared }
                    onClick={ (e)=>handleOnChange("cleared", e.target.value) }
                    size="small" 
                />
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <TextField 
                    value={ todoInfo.timestamp }
                    InputProps={{ sx:{ fontSize: 14 }, disableUnderline: !timestampOnFocus }}
                    variant='standard'
                    sx={{ minWidth: '25ch' }}
                    onFocus={ e=>setTimestampOnFocus(true) }
                    onBlur={ e=>setTimestampOnFocus(false) }
                />
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <Tooltip title={ todoInfo.description }>
                    <TextField 
                        value={ todoInfo.description }
                        onChange={ (e)=>handleOnChange("description", e.target.value) }
                        size="small"
                        InputProps={{ 
                            disableUnderline: descOnFocus?false:true, 
                            endAdornment: (
                                descOnFocus&&
                                <InputAdornment position="end" sx={{ fontSize: '12px' }}>
                                    <IconButton  onClick={ (e)=>handleOnDescClick() }>
                                        <MoreHorizIcon fontSize='small'/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx:{ 
                                fontSize: "14px", 
                                textDecoration: todoInfo.oper==='D' ? 'line-through' : "none",
                            }
                        }}
                        variant='standard'
                        sx={{ 
                            minWidth: '30ch',
                            "& .MuiInputBase-input": {
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }
                        }}
                        onFocus={ e=>setDescOnFocus(true) }
                        onBlur ={ handleOnDescOnBlur }
                    />
                </Tooltip>
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <Tooltip title="삭제">
                    <IconButton color="inherit" onClick={ ()=>props.onDelete(todoInfo.id, todoInfo.name) }>
                        <RemoveCircleIcon fontSize='small'/>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <Tooltip title="수정">
                    <IconButton color="inherit" onClick={ handleOnUpdate }>
                        <DoneIcon fontSize='small'/>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export default TodoListTableRow;