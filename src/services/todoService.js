// const baseUrl = `${process.env.REACT_APP_API_URL}/todos`;
const baseUrl = 'http://localhost:8000/todos'

console.log(baseUrl);

export const loadTodos = () =>{
    return fetch(baseUrl).then((res) => res.json())
}

export const getTodo = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
}

export const createTodo = (todo) => {
    return fetch(baseUrl,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            title: todo.title,
            status: todo.status
        }),
    }).then((res) => res.json());
}

export const updateTodo = (todo) => {
    return fetch(`${baseUrl}/${todo.id}`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            id: todo.id,
            title: todo.title,
            status: todo.status
        }),
    }).then((res) => res.json());
}

export const deleteTodo = (id) => {
    return fetch(`${baseUrl}/${id}`,{
        method: "DELETE",
    }).then(res => res.json());
}