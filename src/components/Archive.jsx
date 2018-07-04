import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import SecureIcon from 'grommet/components/icons/base/Secure';
import PlayFillIcon from 'grommet/components/icons/base/PlayFill';
import PauseFillIcon from 'grommet/components/icons/base/PauseFill';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Label from 'grommet/components/Label';
import Spinning from 'grommet/components/icons/Spinning';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';

import NavControl from './NavControl';
import { loadData, unloadData, watchData, unwatchData } from '../actions/rest';
import { DATA_INIT, DATA_REQUESTED, DATA_RECEIVED } from '../reducers/rest';
class Archive extends React.Component {
    constructor() {
        super();
        this._onClick = this._onClick.bind(this);
        this._onWatch = this._onWatch.bind(this);
        this._onUnWatch = this._onUnWatch.bind(this);
    }

    _onClick(e) {
        this.props.dispatch(loadData());
    }

    _onWatch() {
        this.props.dispatch(watchData());
    }

    _onUnWatch() {
        this.props.dispatch(unwatchData());
    }

    componentWillUnmount() {
        this.props.dispatch(unloadData());
        if (this.props.watching) {
            this.props.dispatch(unwatchData());
        }
    }

    render() {
        let restResult;

        switch (this.props.dataStatus) {
            case DATA_INIT:
                restResult = <Label>Generate OTPs by clicking the button</Label>;
                break;
            case DATA_REQUESTED:
                restResult = <Spinning />;
                break;
            case DATA_RECEIVED:
                restResult = <Label>OTP: {this.props.data.key}</Label>
                break;
            default:
        }

        let watchControl = <Button icon={<PlayFillIcon />} label="Watch" onClick={this._onWatch} />;
        let meterReading = 0;

        if (this.props.watching) {
            watchControl = <Button icon={<PauseFillIcon />} label="Unwatch" onClick={this._onUnWatch} />
        }
        if (this.props.watchData && this.props.watchData.utilization) {
            meterReading = parseInt(this.props.watchData.utilization, 10);
        }
        return (
            <Article pad="none">
                <Header direction="row" justify="start" size="large" pad={{ horizontal: 'medium', between: 'small' }}>
                    <NavControl />
                    <Heading tag="h1">Archive</Heading>
                </Header>
                <Section pad="medium" full="horizontal">
                    <Tiles fill>
                        <Tile pad="medium">
                            <Header size="small" justify="center">
                                <Heading tag="h3">A Slow REST API</Heading>
                            </Header>
                            <Box direction="column" justify="center" align="center" pad={{ horizontal: 'medium', between: 'small' }} margin="large">
                                {restResult}
                                <Button icon={<SecureIcon />} label="Generate OTP" onClick={this._onClick} primary />
                            </Box>
                        </Tile>
                        <Tile pad="medium">
                            <Header size="small" justify="center">
                                <Heading tag="h3">A REST Watcher</Heading>
                            </Header>
                            <Box direction="column" justify="center" align="center" pad={{ horizontal: 'medium', between: 'small' }} margin="large">
                                <Box responsive={false} align="center">
                                    <Meter type='arc' threshold={90} max={100} value={meterReading} />
                                    <Value value={meterReading} units="%" />
                                </Box>
                                <Box direction="row" justify="center" align="center" pad={{ between: 'medium' }}>
                                    {watchControl}
                                </Box>
                            </Box>
                        </Tile>
                    </Tiles>
                </Section>
            </Article>
        );
    }
}

const mapStateToProps = state => ({ data: state.rest.data, dataStatus: state.rest.dataStatus, watching: state.rest.watching, watchData: state.rest.watchData });

export default withRouter(connect(mapStateToProps)(Archive));