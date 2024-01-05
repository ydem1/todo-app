/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodoItem } from './TodoItem';
import * as todoService from '../api/todos';
import { Todo } from '../types/Todo';

export const TodoList: React.FC = () => {
  const {
    todos,
    setErrorMessage,
    filterOption,
  } = useContext(TodosContext);

  const visibleTodo = todos.filter(todo => {
    switch (filterOption) {
      case 'all':
        return true;

      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const deleteTodo = (id: number) => {
    return todoService.deleteTodo(id)
      .catch((error) => {
        setErrorMessage('Unable to delete a todo');
        throw error;
      });
  };

  const updatedTodo = (newTodo: Todo) => {
    return todoService.updateTodo(newTodo)
      .catch((error) => {
        setErrorMessage('Unable to update a todo');
        throw error;
      });
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodo.map(todo => (
        <TodoItem
          todo={todo}
          deleteTodo={deleteTodo}
          updatedTodo={updatedTodo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
