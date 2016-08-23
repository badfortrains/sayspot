// @flow

import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Component } from 'react'
import Artist from '../components/artist'
import type { FullArtist } from '../spotify'
import { connect } from 'react-redux'
import * as metadataActions from '../actions/metadata'
import { bindActionCreators } from 'redux'
import type { spotArtistAction } from '../constants/actionTypes'

import React from 'react'

type cancelPromise<T> = {
  promise: Promise<T>,
  cancel: () => void
}

const makeCancelable = <T>(promise: Promise<T>) : cancelPromise<T> => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
    );
    promise.catch((error) =>
      hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};


class ArtistContainer extends Component {
  props: {
    id: string,
    artist: ?FullArtist,
    actions: {
      spotArtist: (id: string) => spotArtistAction
    }
  };

  state: {
    loading: ?cancelPromise<FullArtist>,
  };

  constructor(props){
    super(props);
    this.state = {
      loading: null
    }
  }

  componentWillMount(){
    if(!this.props.artist){
      const action = this.props.actions.spotArtist(this.props.id);
      const actionPromise = makeCancelable(action.meta)
      actionPromise.promise.then(() => {
        this.setState({
          loading: null
        })
      })
      this.setState({
        loading: actionPromise
      })
    }
  }

  renderLoading(){
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    )
  }

  render(){
    if(this.state.loading) {
      return this.renderLoading()
    }
    return (
      <View style={styles.container}>
        <Artist style={styles.container} {...this.props.artist}></Artist>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

function mapStateToProps(state, ownProps) {
  return {
    artist: state.artists[ownProps.id]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(metadataActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistContainer)
