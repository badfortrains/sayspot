// @flow

'use strict';
import React, { Component } from 'react'
import ReactNative, { View }  from 'react-native'
import Root from './containers/root'

class AwesomeProject extends Component{
  render() {
    return (
      <Root></Root>
    );
  }
}

$(document).on("ready", function(){
  ReactNative.render(<AwesomeProject />, document.getElementById('react-app-header'))
})
