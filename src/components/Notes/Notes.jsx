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
import FilterControl from 'grommet-addons/components/FilterControl';
import Sidebar from 'grommet/components/Sidebar';
import Section from 'grommet/components/Section';
import Layer from 'grommet/components/Layer';
import Button from 'grommet/components/Button';
import Sort from 'grommet-addons/components/Sort';
import _ from 'lodash'

import NavControl from '../NavControl';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import EditIcon from 'grommet/components/icons/base/Edit';
import ViewIcon from 'grommet/components/icons/base/View';
import CloseIcon from 'grommet/components/icons/base/Close';



class Notes extends React.Component {

    constructor (props) {
        super(props);
        this._onSearch = this._onSearch.bind(this);
        this._onFilterActivate = this._onFilterActivate.bind(this);
        this._onFilterDeactivate = this._onFilterDeactivate.bind(this);
        this._onChangeSort = this._onChangeSort.bind(this);
        this.state = { notes:this.props.notes, searchNotes: this.props.notes, searchText: '', sort: ':' };
    }

    _onSearch (event) {
        const searchText = event.target.value;
        this.setState({ searchText });
        this.state.searchNotes = this.state.notes.filter(item => item.title.includes(searchText));
    }

    _onChangeSort (sort) {
        this.state.sort = `${sort.value}:${sort.direction}`;
        this.state.searchNotes = _.orderBy(this.state.searchNotes, sort.value, sort.direction)
        this.setState({ filterActive: false });
    }

    _onFilterActivate () {
        this.setState({ filterActive: true });
    }

    _onFilterDeactivate () {
        this.setState({ filterActive: false });
    }

    render() {
        const { searchNotes, searchText, filterActive } = this.state;
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

        let filterLayer;
        if (filterActive) {
            let sortProperty, sortDirection;
            if (this.state.sort) {
                [ sortProperty, sortDirection ] = this.state.sort.split(':');
            }
            filterLayer =  <Layer align='right' flush={true} closer={false}
                                      a11yTitle='Virtual Machines Filter'>
                 <Sidebar size='large'>
                    <div>
                        <Header size='large' justify='between' align='center'
                                pad={{ horizontal: 'medium', vertical: 'medium' }}>
                            <Heading tag='h2' margin='none'>Filter</Heading>
                            <Button icon={<CloseIcon />} plain={true}
                                    onClick={this._onFilterDeactivate} />
                        </Header>
                        <Section pad={{ horizontal: 'large', vertical: 'small' }}>
                            <Heading tag='h3'>Sort</Heading>
                            <Sort options={[
                                { label: 'Title', value: 'title', direction: 'asc' },
                                { label: 'Category', value: 'category', direction: 'asc' },
                                { label: 'Date', value: 'date', direction: 'desc' },
                            ]} value={sortProperty} direction={sortDirection}
                                  onChange={this._onChangeSort}
                            />
                        </Section>
                    </div>
                </Sidebar>
            </Layer>;
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
                    <FilterControl onClick={this._onFilterActivate}/>
                </Header>
                <Tiles flush={false} fill={false}>
                    {items}
                </Tiles>
                <Anchor icon={<Pulse />}
                        path='/add'
                        a11yTitle={`Add note`} />
                {filterLayer}
            </Box>
        );
    }
}

const mapStateToProps = state => ({ notes: state.note.notes });

export default withRouter(connect(mapStateToProps)(Notes));
