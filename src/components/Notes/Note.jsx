import React, { Component } from 'react';
import Article from 'grommet/components/Article';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import {Headline, Paragraph, Section} from "grommet";
import CloseIcon from 'grommet/components/icons/base/Close';

class Note extends Component {

    constructor (props) {
        super(props);
        this.state = {
            note: this.props.notes.filter(function(o){return o.id == window.location.pathname.substring(window.location.pathname.indexOf("$") + 1);} )[0]
        };
    }

    render () {
        let { note } = this.state;

        return (
            <Article >
                <Box direction='row'
                     colorIndex='neutral-1'
                     align='center'
                     justify='center'
                >
                    <Button
                        label='B'
                        href='#'
                        plain={true}
                    />
                    <Button
                        label='I'
                        href='#'
                        plain={true}
                    />
                    <Button
                        label='U'
                        href='#'
                        plain={true}

                    />
                    <Button
                        label='x'
                        href='#'
                        plain={true}
                    />

                    <Menu responsive={true}
                          label='14'
                          inline={false}>
                        <Anchor href='#'
                                className='active'>
                            {'12'}
                        </Anchor>
                        <Anchor href='#'>
                            {'16'}
                        </Anchor>
                        <Anchor href='#'>
                            {'20'}
                        </Anchor>
                        <Anchor href='#'>
                            {'24'}
                        </Anchor>
                        <Anchor href='#'>
                            {'28'}
                        </Anchor>
                    </Menu>


                    <Menu responsive={true}
                          label='Times New Roman'
                          inline={false}>
                        <Anchor href='#'
                                className='active'>
                            {'Arial'}
                        </Anchor>
                        <Anchor href='#'>
                            {'Calibri'}
                        </Anchor>
                        <Anchor href='#'>
                            {'Comic Sans'}
                        </Anchor>
                    </Menu>

                    <Anchor icon={<CloseIcon />} path="/"
                            a11yTitle={`Close Note Lookup`} />
                </Box>

                <Section pad='large'
                         justify='center'
                         align='center'>

                    <Headline margin='none'>
                        {note.title}
                    </Headline>


                    <Paragraph>
                        {note.content}
                    </Paragraph>

                </Section>
            </Article>
        );
    }
}

const mapStateToProps = state => ({ notes: state.note.notes });

export default withRouter(connect(mapStateToProps)(Note));