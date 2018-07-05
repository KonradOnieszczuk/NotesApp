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
import TrashIcon from 'grommet/components/icons/base/Trash';
import Anchor from 'grommet/components/Anchor';
import DateTime from 'grommet/components/DateTime'
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import { changeNote } from '../../actions/note'
import NoteRemove from './NoteRemove'

class NoteEdit extends Component {

    constructor (props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this._onRemoveOpen = this._onRemoveOpen.bind(this);
        this._onRemoveClose = this._onRemoveClose.bind(this);
        this.state = {
            removing: false,
            note: this.props.notes.filter(function(o){return o.id == window.location.pathname.substring(window.location.pathname.indexOf("$") + 1);} )[0]

        };
    }

    _onSubmit (event) {
        event.preventDefault();
        let note = this.state.note;
        this.props.dispatch(changeNote(note));
        this.props.history.push('/');
    }

    _change (propertyName) {
        return (event) => {
            let note = { ...this.state.note };
            note[propertyName] = event.target.value;
            this.setState({ note: note });
        };
    }

    _onRemoveOpen () {
        this.setState({ removing: true });
    }

    _onRemoveClose () {
        this.setState({ removing: false });
    }

    render () {
        let { note } = this.state;

        let removeControl = (
                <Button plain={true} icon={<TrashIcon />} label="Remove"
                        onClick={this._onRemoveOpen} a11yTitle={`Remove ${note.title} Note`} />
            );

        let removeConfirm;
        if (this.state.removing) {
            removeConfirm = (
                <NoteRemove note={note} onClose={this._onRemoveClose} />
            );
        }

        return (
            <Article align="center" pad={{horizontal: 'medium'}} primary={true}>
                <Form onSubmit={this._onSubmit}>

                    <Header note="large" justify="between" pad="none">
                        <Heading tag="h2" margin="none" strong={true}>
                            {'Edit Note'}
                        </Heading>
                        <Anchor icon={<CloseIcon />} path="/"
                                a11yTitle={`Close Edit Note Form`} />
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
                        <Button type="submit" primary={true} label='OK'
                                onClick={this._onSubmit} />
                        {removeControl}
                    </Footer>
                </Form>

                {removeConfirm}
            </Article>
        );
    }
}

const mapStateToProps = state => ({ notes: state.note.notes });

export default withRouter(connect(mapStateToProps)(NoteEdit));