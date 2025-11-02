import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState<User>();
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setUserError] = useState(false);

  function getId() {
    return todos.map(todo => todo.id).sort((id1, id2) => id2 - id1)[0] + 1;
  }

  const preventSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length < 1) {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    if (!user) {
      setUserError(true);
    } else {
      setUserError(false);
    }

    const titleError = title.length < 1;
    const userError = !user;

    setErrorTitle(titleError);
    setUserError(userError);

    if (titleError || userError) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: getId(),
        title,
        completed: false,
        userId: user?.id || 0,
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => preventSubmit(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setErrorTitle(false);
            }}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={event => {
              const selectedId = Number(event.target.value);
              const selectedUser = usersFromServer.find(
                u => u.id === selectedId,
              );

              setUser(selectedUser);
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(userForSelect => {
              return (
                <option
                  key={userForSelect?.id || 0}
                  value={userForSelect?.id || 0}
                >
                  {userForSelect.name}
                </option>
              );
            })}
          </select>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} getUserFunc={value => getUserById(value)} />
    </div>
  );
};
