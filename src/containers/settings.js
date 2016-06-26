// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../components/loader'
import Login from '../components/login'
import Button from '../components/button'
import Link from '../containers/navLink'
import * as settingsActions from '../actions/settings'

import { ActivityIndicator } from 'react-native'

class Settings extends Component {
  render() {
    const { settings, actions } = this.props
    return (
      <View>
        <Link text="Home"></Link>
        {settings.status === "loading" ?
          <ActivityIndicator
            animating={true}
            style={{height: 80}}
            size="large"
            /> :
          <Login loginPassword={actions.loginPassword}
                 loginDiscovery={actions.loginDiscovery}>
          </Login>
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(settingsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
