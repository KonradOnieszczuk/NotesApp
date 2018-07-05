import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Pulse from 'grommet/components/icons/Pulse';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Search from 'grommet/components/Search';
import {Anchor} from "grommet";

import NavControl from '../NavControl';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import EditIcon from 'grommet/components/icons/base/Edit';
import ViewIcon from 'grommet/components/icons/base/View';


class Notes extends React.Component {

    constructor (props) {
        super(props);
        this._onSearch = this._onSearch.bind(this);
        this.state = { notes:this.props.notes, searchNotes: this.props.notes, searchText: '' };
    }

    _onSearch (event) {
        const searchText = event.target.value;
        this.setState({ searchText });
        this.state.searchNotes = this.state.notes.filter(item => item.title.includes(searchText));
    }

    render() {
        const { searchNotes, searchText } = this.state;
        let items;

        if (searchNotes) {
            items = searchNotes.map((item, _) => (
                <Tile align="center" separator="all" pad='small' justify="between"
                      size="medium" colorIndex={item.color}>
                    <Box align="center">
                        <Anchor icon={<ViewIcon />}
                                path={`/note/$${item.id}`}
                                a11yTitle={`Note ${item.title} Lookup`} />
                        <Heading tag="h2" align="center" strong={true}>
                            {item.title}
                        </Heading>
                        <Heading tag="h3" align="center" uppercase={true}>
                        {item.category}
                        </Heading>
                        <div>{item.content}</div>
                        <div>{item.date}</div>
                    <Anchor icon={<EditIcon />}
                            path={`/edit/$${item.id}`}
                            a11yTitle={`Edit ${item.title} Note`} />
                    </Box>
                </Tile>
            ));
        }

        return (
            <Box>
                <Header size='medium' pad={{ horizontal: 'medium' }}>
                    <Title responsive={false}>
                        <NavControl />
                        <span>Notes</span>
                    </Title>
                    <Search inline={true} fill={true} size='medium' placeHolder='Search'
                            value={searchText} onDOMChange={this._onSearch} />
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
