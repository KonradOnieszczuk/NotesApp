import React, { Component } from 'react';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import Anchor from 'grommet/components/Anchor';
import DateTime from 'grommet/components/DateTime'
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import { addNote } from '../../actions/note'

class NoteAdd extends Component {

    constructor (props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this.state = {
            removing: false,
            note: {id: 69, title: 'Sample', category: 'Sample Category', content: 'Sample sample sample', date: '7/5/2018 2:00 am', color: ''}

        };
    }

    _onSubmit (event) {
        event.preventDefault();
        let note = this.state.note;
        this.props.dispatch(addNote(note));
        this.props.history.push('/');
    }

    _change (propertyName) {
        return (event) => {
            let note = { ...this.state.note };
            note[propertyName] = event.target.value;
            this.setState({ note: note });
        };
    }

    render () {
        let { note } = this.state;

        return (
            <Article align="center" pad={{horizontal: 'medium'}} primary={true}>
                <Form onSubmit={this._onSubmit}>

                    <Header note="large" justify="between" pad="none">
                        <Heading tag="h2" margin="none" strong={true}>
                            {'Add Note'}
                        </Heading>
                        <Anchor icon={<CloseIcon />} path="/"
                                a11yTitle={`Close Add Note Form`} />
                    </Header>

                    <FormFields>

                        <fieldset>
                            <FormField label="Title" htmlFor="title">
                                <input id="title" name="title" type="text"
                                       value={note.title || ''} onChange={this._change('title')} />
                            </FormField>
                            <FormField label="Category" htmlFor="category">
                                <input id="category" name="category" type="text"
                                       value={note.category || ''} onChange={this._change('category')} />
                            </FormField>
                            <FormField label="Content" htmlFor="content">
                            <input id="content" name="content" type="text"
                                   value={note.content || ''} onChange={this._change('content')} />
                            </FormField>
                            <FormField label="Date" htmlFor="date">
                                <DateTime id="date" name="date"
                                          value={note.date || ''} onChange={this._change('date')} />
                            </FormField>
                        </fieldset>

                    </FormFields>

                    <Footer pad={{vertical: 'medium'}} justify="between">
                        <Button type="submit" primary={true} label='Done'
                                onClick={this._onSubmit} />
                    </Footer>
                </Form>
            </Article>
        );
    }
}

const mapStateToProps = state => ({ notes: state.note.notes });

export default withRouter(connect(mapStateToProps)(NoteAdd));