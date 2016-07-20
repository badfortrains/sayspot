// @flow

import React, { Component } from 'react'
import * as NavigationExperimental from '../lib/NavigationExperimental'
import { View, StyleSheet, Text } from 'react-native'
import Home from '../components/home'
import Settings from './settings'
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
    let Item = sceneProps.scene.route.key === "settings" ? Settings : Home
    return (<Item style={styles.navigator}></Item>);
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
