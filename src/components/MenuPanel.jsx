import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import UserAdminIcon from 'grommet/components/icons/base/UserAdmin';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import Tip from 'grommet/components/Tip';

import AttachmentIcon from 'grommet/components/icons/base/Attachment';
import { navActivate } from '../actions/nav';

class MenuPanel extends React.Component {
  constructor() {
    super();
    this._onClose = this._onClose.bind(this);
    this._showTip = this._showTip.bind(this);
    this._hideTip = this._hideTip.bind(this);

    this.state = {
      showTip: false,
    };
  }

  _showTip() {
    this.setState({ showTip: true });
  }

  _hideTip() {
    this.setState({ showTip: false });
  }

  _onClose() {
    this.props.dispatch(navActivate(false));
  }

  render() {
    const links = this.props.items.map((page) => {
      return (
        <Anchor key={page.label} tag="span">
          <Link to={page.path} href={page.path}>{page.label}</Link>
        </Anchor>
      );
    });

    let tip;

    if (this.state.showTip) {
      tip = (
        <Tip target="demoSession" onClose={this._hideTip}>
          Currently user is mocked.
        </Tip>
      );
    }

    return (
      <Sidebar colorIndex="neutral-1" fixed>
        <Header size="large" justify="between" pad={{ horizontal: 'medium' }}>
          <Title onClick={this._onClose} a11yTitle="Close Menu">
            <AttachmentIcon colorIndex="light-1" size="medium" type="logo" />
            <Heading tag="h2" margin="none">Notes</Heading>
          </Title>
          <Button icon={<CloseIcon />} onClick={this._onClose} plain a11yTitle="Close Menu" />
        </Header>
        <Box justify="center" align="center" pad="medium" full="vertical">
          <Menu fill primary size="large">
            {links}
          </Menu>
        </Box>
        <Footer pad={{ horizontal: 'medium', vertical: 'small' }}>
          <Anchor
            id="demoSession"
            icon={<UserAdminIcon />}
            label="Test user"
            onClick={this._showTip}
          />
        </Footer>
        {tip}
      </Sidebar>
    );
  }
}

const mapStateToProps = state => ({ items: state.nav.items });

export default withRouter(connect(mapStateToProps)(MenuPanel));
