import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Pulse from 'grommet/components/icons/Pulse';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import {Anchor} from "grommet";

import NavControl from '../NavControl';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import EditIcon from 'grommet/components/icons/base/Edit';

class Notes extends React.Component {

    render() {
        const notes = this.props.notes;

        let items;

        if (notes) {
            items = notes.map((item, _) => (
                <Tile align="center" separator="all" pad='small' justify="between"
                      size="small">
                    <Box align="center">
                        <Heading tag="h3" align="center" strong={true}>
                            {item.title}
                        </Heading>
                        <div>{item.content}</div>
                        <div>{item.date}</div>
                    </Box>
                    <Anchor icon={<EditIcon />}
                            path={`/edit/$${item.id}`}
                            a11yTitle={`Edit ${item.title} Note`} />
                </Tile>
            ));
        }

        return (
            <Box>
                <Header size='large' pad={{ horizontal: 'medium' }}>
                    <Title responsive={false}>
                        <NavControl />
                        <span>Notes</span>
                    </Title>
                </Header>
                <Tiles flush={false} fill={false}>
                    {items}
                </Tiles>
                <Anchor icon={<Pulse />}
                        path='/add'
                        a11yTitle={`Add note`} />
            </Box>
        );
    }
}

const mapStateToProps = state => ({ notes: state.note.notes });

export default withRouter(connect(mapStateToProps)(Notes));
