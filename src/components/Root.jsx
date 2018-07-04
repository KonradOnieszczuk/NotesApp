import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../store';
import NotesApp from './NotesApp';

class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <NotesApp />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default Root;
