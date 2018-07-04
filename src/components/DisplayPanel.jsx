import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Notes from './Notes';
import Archive from './Archive';

class DisplayPanel extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Notes} />
        <Route exact path="/archive" component={Archive} />
      </Switch>
    );
  }
}

export default DisplayPanel;
