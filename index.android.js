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
  Image,
  TextInput,
  TouchableHighlight,
  NativeModules,
} from 'react-native';

import {
  getBest
} from './spotify.js'

import SpeechAndroid from 'react-native-android-voice';

var AlbumRow = (props) => {
  var album = props.album;
  var image = album.images.reduce((prev, cur) => {
    return prev.height < cur.height ? prev : cur
  });
  return (
    <View style={styles.albumContainer}>
      <Image
        source={{uri: image.url}}
        style={{
          width: image.width,
          height: image.height
        }}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>
          {album.name}
        </Text>
        <Text style={styles.subtitle}>{album.artists[0].name}</Text>
      </View>
    </View>
  )
}

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      albums: [{
        images: [{
          url: 'https://i.scdn.co/image/125521548f6a4bf771611c3cb42e00ab1dd753a4',
          width: 64,
          height: 64,
        }],
        name: 'Feels',
        artists: [{
          name: 'Animal Collective'
        }]
      }]
    };
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
        <TouchableHighlight
          onPress={this.onVoicePress.bind(this)}
          style={styles.button}
          underlayColor="grey">
          <Text>
            Speak
          </Text>
        </TouchableHighlight>
        <View style={styles.listContainer}>
          {
            this.state.albums.map((a,i) => <AlbumRow album={a} key={i} />)
          }
        </View>

      </View>
    );
  }

  onVoicePress() {
    SpeechAndroid.startSpeech("enter search", SpeechAndroid.DEFAULT).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  onPress() {
    var x = NativeModules.SpotAndroid
    var ident = '2cc436bd6a996b61866a07c7a6ac3e1511cd1d46';

    getBest(this.state.text).then((data) => {
      //console.log('got data', data)
      if(!data || !data.tracks){
        return;
      }
      console.log(data)
      if(data.album_type) {
        this.setState({
          albums: [data]
        })
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
    alignItems: 'stretch',
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
  albumContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
