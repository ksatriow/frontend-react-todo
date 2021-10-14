import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, Layout, Row, Col, Input, message } from 'antd';
import './TodoList.css';
import './TodoForm';
import './TodoTab';
import { createTodo, deleteTodo, loadTodos, updateTodo } from '../services/todoService';
import TodoForm from './TodoForm';
import TodoTab from './TodoTab';


const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);
    const [activeTodos, setActiveTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState();

    const handleFormSubmit = (todo) => {
        console.log('TODO to create', todo);
        createTodo(todo).then(onRefresh());
        message.success('Todo Added!!');
    }

    const handleRemoveTodo = (todo) => {
        deleteTodo(todo.id).then(onRefresh());
        message.warn('Todo removed');
    }

    const handleToggleTodoStatus = (todo) => {
        todo.status = !todo.status;
        updateTodo(todo).then(onRefresh());
        message.info('Todos status updated');
    }

    const refresh = () => {
        loadTodos()
            .then(json => {
                setTodos(json);
                setActiveTodos(json.filter(todo => todo.status === false));
                setCompletedTodos(json.filter(todo => todo.status === true));
            }).then(console.log('fetch completed'))
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        let data = await loadTodos();
        setTodos(data);
        setActiveTodos(data.filter(todo => todo.status === false));
        setCompletedTodos(data.filter(todo => todo.status === true));
        setRefreshing(false);
        console.log("Refresh state", refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh])

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <div className="todoList">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>Satrio Todos</h1>
                            <TodoForm onFormSubmit={handleFormSubmit} />
                            <br />
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <TodoTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                    <TodoTab todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}

export default TodoList;