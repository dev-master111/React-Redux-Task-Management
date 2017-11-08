import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions';
import { ThemeProvider } from 'styled-components';
import { theme } from 'components';

import { Page } from 'hedron';
import { NavigationItem, Navigation, Section } from 'components';

class App extends Component {
  componentDidMount() {
    this.props.loadPlugins();
  }
  render() {
    const current = this.props.location.pathname;
    return (
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex', arrangeItmes: 'space-between' }}>
          <Navigation title={'Admin Dashboard'}>
            <NavigationItem to={"/dashboard/home"} current={current}>Home</NavigationItem>
            <NavigationItem to={"/dashboard/demo"} current={current}>Analytics</NavigationItem>
          </Navigation>
          <Section padding={'80px 20px'}>
            <Page width={'1170px'}>
              {this.props.children}
            </Page>
          </Section>
        </div>
      </ThemeProvider>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => bindActionCreators(
    { ...actions },
    dispatch
  )
)(App);
