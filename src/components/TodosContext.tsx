import React, { useState, useMemo, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { FilterOptions } from '../types/FilterOptions';
import { getTodos } from '../api/todos';

const initiatTodos: Todo[] = [];
const USER_ID_INITAT = 11930;

interface TodosContextType {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterOption: FilterOptions,
  setFilterOptions: (filterOption: FilterOptions) => void,
  USER_ID: number,
  errorMessage: string,
  setErrorMessage: (errorMessage: string) => void,
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: initiatTodos,
  setTodos: () => { },
  filterOption: 'all',
  setFilterOptions: () => { },
  USER_ID: USER_ID_INITAT,
  errorMessage: '',
  setErrorMessage: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState(initiatTodos);
  const [filterOption, setFilterOptions]
    = useState<FilterOptions>('all');
  const USER_ID = USER_ID_INITAT;
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(USER_ID).then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterOption,
    setFilterOptions,
    USER_ID,
    errorMessage,
    setErrorMessage,
  }), [
    todos,
    filterOption,
    errorMessage]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
