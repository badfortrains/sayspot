// @flow

'use strict';
import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native'
import Root from './containers/root'

class AwesomeProject extends Component{
  render() {
    return (
      <Root></Root>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
