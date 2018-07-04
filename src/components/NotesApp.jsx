import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';

import { navResponsive, routeChanged } from '../actions/nav';
import MenuPanel from './MenuPanel';
import DisplayPanel from './DisplayPanel';

class NotesApp extends React.Component {
    constructor() {
        super();
        this._onResponsive = this._onResponsive.bind(this);
    }

    componentDidMount() {
        this.props.history.listen((location) => {
            this.props.dispatch(routeChanged(location));
        });
    }

    _onResponsive(responsive) {
        this.props.dispatch(navResponsive(responsive));
    }

    render() {
        let nav;
        if (this.props.active) {
            nav = <MenuPanel />;
        }

        const priority = (this.props.active && this.props.responsive === 'single' ? 'left' : 'right');

        return (
            <App centered={false}>
                <Split priority={priority} flex="right" onResponsive={this._onResponsive}>
                    {nav}
                    <DisplayPanel />
                </Split>
            </App>
        );
    }
}

const mapStateToProps = state => ({
    responsive: state.nav.responsive,
    active: state.nav.active,
});

export default withRouter(connect(mapStateToProps)(NotesApp));