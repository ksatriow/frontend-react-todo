import React, { useState } from 'react';
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { CheckOutlined } from '@ant-design/icons'
import { CloseOutlined  } from '@ant-design/icons'

const Todo = ({ todo, onTodoRemoval, onTodoToggle }) => {
    return (
        <List.Item
            actions={[
                <Tooltip
                    title={todo.status ? 'Not Yet' : 'Done'}
                >
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        uncheckedChildren={<CloseOutlined/>}
                        onChange={() => onTodoToggle(todo)}
                        defaultChecked={todo.status}
                    />
                </Tooltip>,
                <Popconfirm
                    title={'Are you sure want to delete?'}
                    onConfirm={() => {
                        onTodoRemoval(todo)
                    }}>
                    <Button className="remove-todo-button" type="primary" danger>
                        X
                    </Button>
                </Popconfirm>
            ]}
            className="list-item"
            key={todo.id}
        >
            <div className="todo-item">
                <Tag color={todo.status ? 'cyan' : 'red'} className="todo-tag">
                    {todo.title}
                </Tag>
            </div>
        </List.Item>
    )
}

export default Todo;