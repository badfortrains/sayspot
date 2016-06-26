// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import Home from '../components/home'
import Settings from './settings'
import { connect } from 'react-redux'

class MyRouter extends Component {
  props: {
    section: string
  };

  render() {
    let Item = this.props.section === "settings" ? Settings : Home
    return <View>
      <Item></Item>
    </View>
  }
}

function mapStateToProps(state) {
  return {
    section: state.route.section
  }
}

export default connect(
  mapStateToProps
)(MyRouter)
