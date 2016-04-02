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
  ListView,
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

import {
  getBest
} from './spotify.js'

import SpeechAndroid from 'react-native-android-voice';

var AlbumRow = (props) => {
  var album = props.item;
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

var ArtistRow = (props) => {
  var artist = props.item;
  var image = artist.images.reduce((prev, cur) => {
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
          {artist.name}
        </Text>
      </View>
    </View>
  )
}

var TrackRow = (props) => {
  var track = props.item;
  var album = track.album;
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
          {track.name}
        </Text>
        <Text style={styles.subtitle}>
          {track.artists[0].name} - {album.name}
        </Text>
      </View>
    </View>
  )
}



class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      Component: null,
      items: null
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
        <TouchableHighlight
          onPress={this.onDiscoverPress.bind(this)}
          style={styles.button}
          underlayColor="grey">
          <Text>
            Discover
          </Text>
        </TouchableHighlight>
        <View style={styles.listContainer}>
          {
            this.state.items ?
            <ListView
              dataSource={this.state.items}
              renderRow={(rowData) => <this.state.Component item={rowData} />}
            />
            :
            null
          }

        </View>

      </View>
    );
  }

  onDiscoverPress() {
    NativeModules.SpotAndroid.startDiscovery()
        .then((blob) => console.log('got blob', blob));
  }

  onVoicePress() {
    SpeechAndroid.startSpeech("enter search", SpeechAndroid.DEFAULT).then((res) => {
      this.setState({text: res});
      this.onPress();
    }).catch((err) => {
      console.log(err);
    });
  }

  onPress() {
    var x = NativeModules.SpotAndroid
    x.listMdnsDevices().then((data) => {
      console.log(data);
      var devices = JSON.parse(data);
      console.log(devices);
    })
    DeviceEventEmitter.addListener('SpotDeviceNotify', (data) => {
      var update = JSON.parse(data);
      console.log(update)
    });
    x.getUpdates();
    //var ident = '2cc436bd6a996b61866a07c7a6ac3e1511cd1d46';
    // var ident = '00:05:CD:44:EA:E0';
    //
    // getBest(this.state.text).then((data) => {
    //   //console.log('got data', data)
    //   if(!data || !data.tracks){
    //     return;
    //   }
    //   console.log(data)
    //   var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //   if(data.album_type) {
    //     this.setState({
    //       Component: AlbumRow,
    //       items: ds.cloneWithRows([data]),
    //     })
    //   } else {
    //     this.setState({
    //       Component: TrackRow,
    //       items: ds.cloneWithRows(data.tracks)
    //     })
    //   }
    //
    //   var items = data.tracks.items ? data.tracks.items : data.tracks;
    //   var ids = items.map((track) => track.id).join(',');
    //   //console.log(ids)
    //   x.loadTracks(ident, ids);
    //   x.play(ident);
    // })

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
    flexDirection: 'column',
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
