import React, { Component } from 'react';
import styled from 'styled-components';
import { Section } from 'components';
import { Column, Hidden, Page, Row } from 'hedron';
import { Icon } from 'react-fa';

const MenuIcon = styled(Icon)`
  color: #999;
  cursor: pointer;
`;

const NavigationBar = styled.div`
  justify-content: stretch;
  background: #222;
  width: 300px;
  height: 100vh;
  z-index: 999;
  left: 0;
`;

const NavigationLogo = styled.div`
  font-size: 2em;
  color: #eee;
  padding: 20px 0;
`;


class NavigationContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  showMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  render() {
    const { className, title, children } = this.props;
    return (
      <nav className={className}>
        <NavigationBar>
          <Page width={'300px'}>
            <Row divisions={6} justifyContent={'space-between'}>
              <Column fluid xs={6} sm={6} md={6}>
                <Row divisions={6}>
                </Row>
                <Row divisions={6} justifyContent={'center'}>
                  <Row fluid xs={6}>
                    <Section padding={'0 20px'}>
                      <NavigationLogo>{title}</NavigationLogo>
                    </Section>
                  </Row>
                  <Row fluid xs={6}>
                    <Hidden lg md>
                      <Section padding={'20px'} textAlign={'right'}>
                        <MenuIcon name={'bars'} onClick={this.showMenu} />
                      </Section>
                    </Hidden>
                  </Row>
                </Row>
              </Column>
              <Column fluid xs={6} sm={6} md={6}>
                <Hidden lg md sm={!this.state.isMenuOpen} xs={!this.state.isMenuOpen}>
                  <Row divisions={children.length}>
                    {children.map((child, i) => (
                      <Row fluid key={i} sm={children.length}>
                        {child}
                      </Row>
                    ))}
                  </Row>
                </Hidden>
                <Hidden xs sm>
                  <Column justifyContent={'flex-start'}>
                    {children}
                  </Column>
                </Hidden>
              </Column>
            </Row>
          </Page>
        </NavigationBar>
      </nav>
    );
  }
}

const Navigation = styled(NavigationContent)`
  background-color: ${props => props.theme.black};
  width: 300px;
  color: #ccc;
`;

export default Navigation;
