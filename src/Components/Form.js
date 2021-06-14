import React, { useState, useReducer } from 'react';
import Notification from './Notification';

const reducer = (state, action) => {
  if (action.type === 'ADD_USER') {
    const newUser = [...state.user, action.payload];
    return {
      ...state,
      user: newUser,
      isNotif: true,
      notifText: 'your added new user',
    };
  }
  if (action.type === 'NO_INPUT') {
    return {
      ...state,
      isNotif: true,
      notifText: 'please added text',
    };
  }
  if (action.type === 'CLOSE_NOTIF') {
    return {
      ...state,
      isNotif: false,
    };
  }
  if (action.type === 'REMOVE_USER') {
    const removeUser = state.user.filter(
      (person) => person.id !== action.payload
    );
    return {
      ...state,
      user: removeUser,
      isNotif: true,
      notifText: 'Your Remove User!',
    };
  }
};

const initial_state = {
  user: [],
  isNotif: false,
  notifText: '',
};

function Form() {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [state, dispatch] = useReducer(reducer, initial_state);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName && password) {
      const newUser = {
        id: new Date().getTime().toString(),
        name: userName,
        pwd: password,
      };
      dispatch({ type: 'ADD_USER', payload: newUser });
      setuserName('');
      setPassword('');
    } else {
      dispatch({ type: 'NO_INPUT' });
    }
  };

  const closeNotif = () => {
    dispatch({ type: 'CLOSE_NOTIF' });
  };

  return (
    <>
      {state.isNotif && (
        <Notification openNotif={state.notifText} closeNotif={closeNotif} />
      )}
      <form onSubmit={handleSubmit} className='container'>
        <div className='form-control'>
          <label htmlFor='username'>name</label>
          <input
            type='text'
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            placeholder='typing username'
            name='username'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='typing password'
            name='password'
          />
        </div>
        <button className='btn'>process</button>
      </form>

      {state.user.length > 0 && (
        <div
          className='container-item container'
          style={{ margin: '2rem auto' }}
        >
          <header className='cols-3'>
            <h3>name</h3>
            <h3>password</h3>
            <h3>remove user</h3>
          </header>
          {state.user.map((item) => {
            return (
              <footer
                className='cols-3'
                style={{ marginBottom: '1rem' }}
                key={item.id}
              >
                <h4 style={{ textTransform: 'capitalize' }}>{item.name}</h4>
                <h4 style={{ textTransform: 'capitalize' }}>{item.pwd}</h4>
                <button
                  className='remove-item'
                  onClick={() =>
                    dispatch({ type: 'REMOVE_USER', payload: item.id })
                  }
                >
                  remove user
                </button>
              </footer>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Form;
