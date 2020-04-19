import React, { Fragment, useState } from 'react';

import './App.css';

type FormElm = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}
function App() {
  const [value, setValue] = useState<string>('');
  const [todos, setTodo] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElm): void => {
    e.preventDefault();
    addToDo(value);
    setValue('');
  };

  const addToDo = (text: string): void => {
    const newTodo: ITodo[] = [...todos, { text: text, complete: false }];
    setTodo(newTodo);
  };

  const completeToDo = (index: number): void => {
    const newTodo: ITodo[] = [...todos];
    newTodo[index].complete = !newTodo[index].complete;
    setTodo(newTodo);
  };

  const deleteTodo = (index: number): void => {
    const newTodo: ITodo[] = [...todos];
    const filteredArray = newTodo.filter(
      (toDo: ITodo, todoIndex) => index !== todoIndex
    );
    setTodo(filteredArray);
  };
  return (
    <div id='form'>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            name='todo'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='form-control'
            id='todo'
            required
          />
          <div className='' id='form-button'>
            <button className='btn btn-primary' type='submit'>
              Submit
            </button>
          </div>
        </div>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => (
          <Fragment key={index}>
            <div
              style={{ textDecoration: todo.complete ? 'line-through' : '' }}
              className='todo-items'
            >
              {todo.text}
            </div>
            {todo.complete ? (
              <button
                className='btn btn-danger'
                onClick={() => completeToDo(index)}
              >
                Start Again
              </button>
            ) : (
              <button
                className='btn btn-success'
                onClick={() => completeToDo(index)}
              >
                Complete
              </button>
            )}
            <button
              className='btn btn-danger'
              onClick={() => deleteTodo(index)}
              style={{ marginLeft: '1.4rem' }}
            >
              Delete{' '}
            </button>
          </Fragment>
        ))}
      </section>
    </div>
  );
}

export default App;
