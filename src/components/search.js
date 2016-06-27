// @flow

import React, { Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ListView,
  ScrollView,
} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as searchActions from '../actions/metadata'

import type { Album, Artist, Track, SearchResult} from '../spotcontrol'

const AlbumRow = (props: Album) => (
  <View style={styles.albumContainer}>
    {props.uri ?
      <Image source={{uri: props.image}}
        style={{width: 50, height: 50}}/>
      :
      null
    }
    <View style={styles.rightContainer}>
      <Text style={styles.title}>
        {props.name}
      </Text>
      <Text style={styles.subtitle}>{props.artists[0].name}</Text>
    </View>
  </View>
)

const ArtistRow = (props: Artist) => (
  <View style={styles.albumContainer}>
    {props.uri ?
      <Image source={{uri: props.image}}
        style={{width: 50, height: 50}}/>
      :
      null
    }
    <View style={styles.rightContainer}>
      <Text style={styles.title}>
        {props.name}
      </Text>
    </View>
  </View>
)

const TrackRow = (props: Track) => (
  <View style={styles.albumContainer}>
    <View style={styles.rightContainer}>
      <Text style={styles.title}>
        {props.name}
      </Text>
      <Text style={styles.subtitle}>
        {props.artists[0].name} - {props.album.name}
      </Text>
    </View>
  </View>
)

const SearchResults = (props: SearchResult) => (
  <ScrollView style={styles.listContainer}>
    <View>
      {props.artists.hits.map(a => <ArtistRow key={a.uri} {...a}></ArtistRow>)}
      {props.albums.hits.map(a => <AlbumRow key={a.uri} {...a}></AlbumRow>)}
      {props.tracks.hits.map(t => <TrackRow key={t.uri} {...t}></TrackRow>)}
   </View>
  </ScrollView>
)

class Search extends Component {
  state: {
    text: string
  };

  props: {
    searchResult?: SearchResult,
    actions: Object
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      text: ""
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
        {this.props.searchResult ?
          <SearchResults {...this.props.searchResult}></SearchResults>
          :
          null
        }

      </View>
    );
  }

  onVoicePress() {
    // SpeechAndroid.startSpeech("enter search", SpeechAndroid.DEFAULT).then((res) => {
    //   this.setState({text: res});
    //   this.onPress();
    // }).catch((err) => {
    //   console.log(err);
    // });
  }

  onPress() {
    this.props.actions.spotSearch(this.state.text)
    // var ident = this.props.ident
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
    //   spotcontrol.loadTracks(ident, ids)
    //   .then(() => spotcontrol.play(ident));
    //   ;
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
    alignItems: 'stretch',
    backgroundColor: '#F5CCCC',
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

function mapStateToProps(state) {
  return {
    searchResult: state.search.search
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
