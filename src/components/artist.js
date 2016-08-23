import {
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import Image from 'imageShared'
import React, { Component } from 'react'
import type {FullArtist, Album, ImageType} from '../spotify'

function getImage(images: Array<ImageType>, bestWidth: number) : ?string {
  return images.reduce((prev,cur) =>
    Math.abs(prev.width - bestWidth) < Math.abs(cur.width - bestWidth)
        ? prev : cur
  )
}

class AlbumBox extends Component {
  props: Album

  render() {
    const bestImage = getImage(this.props.images, 80);
    console.log(bestImage.url)
    return (
      <View>
        <Image source={{uri: bestImage.url}}
               style={{width: 80, height: 80}}></Image>
        <Text>{this.props.name}</Text>
      </View>
    )
  }
}

export default class Artist extends Component {
  props: FullArtist
  render() {
    const bestImage = getImage(this.props.artist.images, 250)
    return (
      <ScrollView>
        <View>
          {bestImage ?
            <Image source={{uri: bestImage.url}}
              style={{width: 250, height: 250}}/>
            :
            null
          }
          <View>
            <Text>{"Albums"}</Text>
            {this.props.albums.items.map(a => <AlbumBox key={a.id} {...a}></AlbumBox>)}
          </View>
        </View>
      </ScrollView>
    )
  }
}
