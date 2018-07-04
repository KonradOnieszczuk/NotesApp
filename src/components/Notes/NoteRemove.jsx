import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayerForm from 'grommet-templates/components/LayerForm';
import Paragraph from 'grommet/components/Paragraph';
import {withRouter} from "react-router-dom";
import { deleteNote } from '../../actions/note'

class NoteRemove extends Component {

    constructor () {
        super();
        this._onRemove = this._onRemove.bind(this);
    }

    _onRemove () {
        this.props.dispatch(deleteNote(this.props.note));
        this.props.history.push('/');
    }

    render () {
        let note = this.props.note;
        return (
            <LayerForm title="Remove Note" submitLabel="Yes, Remove"
                       compact={true}
                       onClose={this.props.onClose} onSubmit={this._onRemove}>
                <fieldset>
                    <Paragraph>Are you sure you want to remove {note.name}?</Paragraph>
                </fieldset>
            </LayerForm>
        );
    }
}

const mapStateToProps = state => ({ notes: state.note.notes });

export default withRouter(connect(mapStateToProps)(NoteRemove));
