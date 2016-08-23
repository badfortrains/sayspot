// @flow

import React, { Component } from 'react'
import * as NavigationExperimental from '../lib/NavigationExperimental'
import { View, StyleSheet, Text } from 'react-native'
import Home from '../components/home'
import Settings from './settings'
import Artist from './artist'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as navActions from '../actions/navigation'


const { CardStack: NavigationCardStack } = NavigationExperimental;

class MyRouter extends Component {
  props: {
    navigationState: Object,
    actions: Object
  };

  render() {
    const { navigationState, actions } = this.props
    return(
      <NavigationCardStack
        onNavigate={()=>{}}
        onNavigateBack={actions.navigateBack}
        navigationState={navigationState}
        renderScene={this._renderScene}
        style={styles.navigator}
      />
    )
  }

  _renderScene(sceneProps: Object): ReactElement<any> {
    const route = sceneProps.scene.route
    let Item
    switch(route.key){
      case 'settings':
        Item = Settings
        break;
      case 'artist':
        Item = Artist
        break;
      case 'home':
      default:
        Item = Home
    }
    return (<Item style={styles.navigator} {...route.params}></Item>);
  }

  handleBackAction(): boolean {
    return this.props.actions.navigateBack()
  }
}

function mapStateToProps(state) {
  return {
    navigationState: state.navigation
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(navActions, dispatch)
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRouter)
