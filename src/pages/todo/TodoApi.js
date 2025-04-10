import { createRestTemplate } from "inzi-mes-platform-frontend-framework";

const restTemplate = createRestTemplate();

const BASE_URL_SERVER_TODO = process.env.REACT_APP_URL_SERVER_TODO;

console.log("BASE_URL_SERVER_TODO=>" + BASE_URL_SERVER_TODO);

export const registerTodo = (todoInfo, onResponse) => {
    var url=BASE_URL_SERVER_TODO+"/api/v1/todo/register";
    restTemplate.post(url, todoInfo, onResponse);
}

export const clearTodo = (id, onResponse) => {
    var url=BASE_URL_SERVER_TODO+"/api/v1/todo/clear/"+id;
    restTemplate.get(url, onResponse);
}

export const clearTodoByName = (name, onResponse) => {
    var url=BASE_URL_SERVER_TODO+"/api/v1/todo/clear/byName/"+name;
    restTemplate.get(url, onResponse);
}

export const updateTodo = (todoInfo, onResponse) => {
    var url=BASE_URL_SERVER_TODO+"/api/v1/todo/update";
    restTemplate.post(url, todoInfo, onResponse);
}

export const searchTodo = (searchCondition, onResponse) => {
    var url=BASE_URL_SERVER_TODO+"/api/v1/todo/search";
    restTemplate.post(url, searchCondition, onResponse);
}

export const searchTodoAll = (onResponse) => {
    var url=BASE_URL_SERVER_TODO+"/api/v1/todo/search/all";
    restTemplate.get(url, onResponse);
}

export const deleteTodo = (id, onResponse) => {
    var url=BASE_URL_SERVER_TODO+"/api/v1/todo/delete/"+id;
    restTemplate.get(url, onResponse);
}

export const deleteTodoByName = (name, onResponse) => {
    var url=BASE_URL_SERVER_TODO+"/api/v1/todo/delete/byName/"+name;
    restTemplate.get(url, onResponse);
}