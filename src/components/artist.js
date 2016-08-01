import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import React from 'react'

export default (props) =>  (
  <TouchableHighlight
    onPress={props.onClick}>
    <View style={{width: 150, height: 50}}>
      <Text>{props.text}</Text>
    </View>
  </TouchableHighlight>
);
