import {
  Text,
  View,
  TouchableNativeFeedback
} from 'react-native';

import React from 'react'

export default (props) =>  (
  <TouchableNativeFeedback
    onPress={props.onClick}
    background={TouchableNativeFeedback.SelectableBackground()}>
    <View style={{width: 150, height: 50}}>
      <Text>{props.text}</Text>
    </View>
  </TouchableNativeFeedback>
);
