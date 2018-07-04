import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Notes from './Notes/Notes';
import NoteEdit from './Notes/NoteEdit';
import NoteAdd from './Notes/NoteAdd';

class DisplayPanel extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Notes} />
        <Route exact path="/add" component={NoteAdd} />
        <Route exact path="/edit/*" component={NoteEdit} />
      </Switch>
    );
  }
}

export default DisplayPanel;
