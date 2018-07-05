import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Notes from './Notes/Notes';
import NoteEdit from './Notes/NoteEdit';
import NoteAdd from './Notes/NoteAdd';
import Calendar from './Calendar/Calendar';
import Archive from './Archive/Archive';

class DisplayPanel extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Notes} />
        <Route exact path="/add" component={NoteAdd} />
        <Route exact path="/edit/*" component={NoteEdit} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/archive*" component={Archive} />
      </Switch>
    );
  }
}

export default DisplayPanel;
