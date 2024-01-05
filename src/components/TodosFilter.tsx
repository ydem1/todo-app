import React, { useContext } from 'react';
import cn from 'classnames';

import { TodosContext } from './TodosContext';

export const TodosFilter: React.FC = () => {
  const {
    filterOption,
    setFilterOptions,
  } = useContext(TodosContext);

  const handleClickAll = () => {
    setFilterOptions('all');
  };

  const handleClickActive = () => {
    setFilterOptions('active');
  };

  const handleClickCompleted = () => {
    setFilterOptions('completed');
  };

  return (
    <nav className="filter" data-cy="FilterOptions">
      <a
        href="#/"
        data-cy="FilterOptionsLinkAll"
        className={cn(
          'filter__link',
          { selected: filterOption === 'all' },
        )}
        onClick={handleClickAll}
      >
        All
      </a>

      <a
        href="#/active"
        data-cy="FilterOptionsLinkActive"
        className={cn(
          'filter__link',
          { selected: filterOption === 'active' },
        )}
        onClick={handleClickActive}
      >
        Active
      </a>

      <a
        href="#/completed"
        onClick={handleClickCompleted}
        data-cy="FilterOptionsLinkCompleted"
        className={cn(
          'filter__link',
          { selected: filterOption === 'completed' },
        )}
      >
        Completed
      </a>
    </nav>
  );
};
