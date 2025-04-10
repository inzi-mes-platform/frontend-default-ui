import React from 'react';

import {
    Box,
    TextField,
} from '@mui/material';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';

import { GlobalAlertContext as AlertContext } from 'inzi-mes-platform-frontend-framework';
import { registerTodo } from './TodoApi';

const TodoAddDialog = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [open, setOpen] = React.useState(props.open);
    const [values, setValues] = React.useState({
        id: "",
        name: "",
        asignee: "",
        cleared: false,
        description: "",
        timestamp: ""
    });

    React.useEffect(()=>{
        setOpen(props.open);
    }, [props.open]);

    const handleOnClose = () => {
        props.onClose();
    }

    const handleOnConfirm = () => {
        registerTodo(values, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({
                    title: "Success to register new Todo",
                    message: "New Todo is registered successfully (" + values.name  + ")",
                    modal: false
                });
                props.onClose();
                props.onAdditionCompleted();
            } else {
                Notifier.warn({ title: "Fail to register Todo.", message: "Fail to register new Todo [" + values.name + "], with error [" + error + "]", modal: true });
            }
        });
    }

    return (
        <ConfirmationModalDialog 
            open={ open }
            onClose={ handleOnClose }
            onCancel={ handleOnClose }
            onConfirm={ handleOnConfirm }
            title="Add New Todo"
            confirmation={ true }
            setOpen={ props.handleClose }
            titleDivider
            actionDivider
        >
            <Box>
                <TextField
                    sx={{ p:0, width: '50ch' }}
                    required
                    id="todo-name-text-field-outlined-required"
                    label="Type Todo Name"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx:{ fontSize: 14 } }}
                    onChange={e=>setValues({
                        ...values,
                        name: e.target.value
                    })}
                    size='small'
                />
            </Box>
            <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
                <TextField
                    sx={{ p:0, width: '50ch' }}
                    required
                    id="assignee-text-field-outlined-required"
                    label="Type todo assignee"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx:{ fontSize: 14 } }}
                    onChange={e=>setValues({
                        ...values,
                        assignee: e.target.value
                    })}
                    size='small'
                />
            </Box>
            <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
                <TextField
                    sx={{ p:0, width: '50ch' }}
                    required
                    id="timestamp-text-field-outlined-required"
                    label="Type todo timestamp"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx:{ fontSize: 14 } }}
                    onChange={e=>setValues({
                        ...values,
                        timestamp: e.target.value
                    })}
                    size='small'
                />
            </Box>
            <Box sx={{ mt: 2.5 }}>
                <TextField
                    sx={{ p:0, width: '50ch' }}
                    multiline
                    rows={4}
                    id="description-outlined"
                    label="Description"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    onChange={e=>setValues({
                        ...values,
                        description: e.target.value
                    })}
                />
            </Box>
        </ConfirmationModalDialog>
    )
}

export default TodoAddDialog;