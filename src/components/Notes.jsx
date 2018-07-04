import React from 'react';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import Notification from 'grommet/components/Notification';
import Quote from 'grommet/components/Quote';
import Paragraph from 'grommet/components/Paragraph';
import WorldMap from 'grommet/components/WorldMap';


import NavControl from './NavControl';

class Notes extends React.Component {
  render() {
    return (
      <Article pad="none">
        <Header direction="row" justify="start" size="large" pad={{ horizontal: 'medium', between: 'small' }}>
          <NavControl />
          <Heading tag="h1">Home</Heading>
        </Header>
        <Section pad="medium" full="horizontal">
          <Header justify="between">
            <Heading tag="h3" margin="none">Grommet provides a library of React components</Heading>
          </Header>
          <Tiles fill>
            <Tile pad="medium">
              <Header size="small" justify="center">
                <Heading tag="h3">Quote</Heading>
              </Header>
              <Box justify="center" align="center" pad="medium">
                <Quote credit="Eric Soderberg" borderColorIndex="accent-1">
                  <Paragraph>
                    If you were to give me just one sentence to describe Grommet,
                    I would say it is the most advanced open source UX framework
                    available for enterprise applications.
                  </Paragraph>
                </Quote>
              </Box>
            </Tile>
            <Tile pad="medium">
              <Header size="small" justify="center">
                <Heading tag="h3">Progress & Notifications</Heading>
              </Header>
              <Notification message="Grommet Notifications" status="warning" />
              <Box direction="row" justify="between" align="center" pad={{ horizontal: 'medium', between: 'small' }}>
                <Spinning />
                <Value value={40} units="%" align="start" />
                <Meter value={40} />
              </Box>
            </Tile>
            <Tile pad="medium">
              <Header size="small" justify="center">
                <Heading tag="h3">World Map</Heading>
              </Header>
              <Box justify="center" align="center" pad="medium">
                <WorldMap
                  colorIndex="accent-1"
                  series={[{
                    continent: 'NorthAmerica',
                    label: 'North America',
                    colorIndex: 'graph-1',
                  }, {
                    continent: 'SouthAmerica',
                    label: 'South America',
                    colorIndex: 'accent-2',
                    }, {
                    continent: 'Europe',
                    label: 'Europe',
                    colorIndex: 'unset',
                  }, {
                    continent: 'Africa',
                    label: 'Africa',
                    colorIndex: 'graph-2',
                  }, {
                    continent: 'Asia',
                    label: 'Asia',
                    colorIndex: 'graph-3',
                  }, {
                    continent: 'Australia',
                    label: 'Australia',
                  }]}
                />
              </Box>
            </Tile>
          </Tiles>
        </Section>
      </Article>
    );
  }
}

export default Notes;
