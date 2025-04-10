import React from 'react';

import { GlobalAlertContext as AlertContext } from 'inzi-mes-platform-frontend-framework';
import SelectableSearchBySearchBar from '../../widgets/bars/SelectableSearchBySearchBar';

import { searchTodo } from './TodoApi';

const TodoSearchView = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const handleOnSearch = (searchCondition) => {
        searchTodo(searchCondition, (todoList, error)=>{
            if(error===undefined) {
                props.onTodoListChange(todoList);
            } else {
                Notifier.warn({ title: "Fail to search todos", message: error.message, modal: true })
            }
        });
    }

    return (
        <SelectableSearchBySearchBar 
            defaultSearchBy="name"
            hideSearchBy={ false }
            onSearch={ handleOnSearch }
            sortBy={[ "id", "name" ]}
            searchByMenuItems={[
                { key: "name", value: "name", text: "Name" },
                { key: "assignee", value: "assignee", text: "Assignee" },
                { key: "timestamp", value: "timestamp", text: "Timestamp" },
                { key: "description", value: "description", text: "Description" }
            ]}
            title="Todo 검색"
            { ...props }
        />
    )
}

export default TodoSearchView;