/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  NativeModules,
} from 'react-native';

import {
  getBest
} from './spotify.js'

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this.onPress.bind(this)}
          value={this.state.text}
        />
        <TouchableHighlight
          onPress={this.onPress.bind(this)}
          style={styles.button}
          underlayColor="grey">
          <Text>
            Search
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  onPress() {
    var x = NativeModules.SpotAndroid
    var ident = '2cc436bd6a996b61866a07c7a6ac3e1511cd1d46';

    getBest(this.state.text).then((data) => {
      //console.log('got data', data)
      if(!data || !data.tracks){
        return;
      }
      var items = data.tracks.items ? data.tracks.items : data.tracks;
      var ids = items.map((track) => track.id).join(',');
      //console.log(ids)
      x.loadTracks(ident, ids);
      x.play(ident);
    })

    // x.loadTracks(ident, '2nMW1mZmdIt5rZCsX1uh9J')
    // x.play(ident);
    //Math.random() > 0.5 ? x.play(ident) : x.pause(ident)
    //console.error(this.state)
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    borderColor: '#696969',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
