// @flow

'use strict';
import React, { Component } from 'react'
import { View } from 'react-native'
import Root from './containers/root'

class AwesomeProject extends Component{
  render() {
    return (
      <Root></Root>
    );
  }
}

ReactNative.render(<AwesomeProject />, document.getElementById('react-app-header'))
