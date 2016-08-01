/**
 *
 * @providesModule spotcontrol
 * @flow
 */

import {
  NativeModules,
  DeviceEventEmitter
} from 'react-native'

type deviceTyp = Object

export type Artist = {
  Image: string,
  Name: string,
  Uri: string,
  Log?:  {
    top_hit: "artists"
  }
}

export type Album = {
  Image: string,
  Name: string,
  Uri: string,
  Artists?: Array<Artist>,
  Log?:  {
    top_hit: "albums"
  }
}

export type Track = {
  Album: Album,
  Artists: Array<Artist>,
  Image: string,
  Name: string,
  Uri: string,
  Duration: number,
  Popularity: number,
  Log?:  {
    TopHit: "tracks"
  }
}
export type SearchResult = {
  Artists: {
    Hits: Array<Artist>,
    Total: number
  },
  Albums: {
    Hits: Array<Album>,
    Total: number
  },
  Tracks: {
    Hits: Array<Track>,
    Total: number
  }
}

export type SuggestResult = {
  Albums: Array<Album>,
  Artists: Array<Artist>,
  Tracks: Array<Track>,
  TopHists: Array<Album | Artist | Track>
}


const spotcontrol : {
  login: (username: string, passowrd: string) => Promise<string>,
  loginBlob: (username: string, blob: string) => Promise<string>,
  startDiscovery: () => Promise<{username: string, blob: string}>,
  getDevices: () => Promise<string>,
  listMdnsDevices: () => Promise<string>,
  hello: () => Promise<string>,
  doSearch: (term: string) => Promise<SearchResult>,
  doSuggest: (term: string) => Promise<SuggestResult>
} = NativeModules.SpotAndroid;

let SpotDevices : Array<deviceTyp> = [];

DeviceEventEmitter.addListener('SpotDeviceNotify', (data) => {
  var update = JSON.parse(data);

  //hello
  if (update.typ == 1) {
  }

  //notify
  if(update.typ == 10) {
    var device = SpotDevices.find((d) => d.ident == update.ident)
    if (device) {
      device.isConnected = true
    } else {
      SpotDevices.push({
        name: update.device_state.name,
        ident: update.ident
      })
      DeviceEventEmitter.emit('SpotDeviceAdd', SpotDevices)
    }
  }

});

spotcontrol.doSearch = function(term: string) : Promise<SearchResult> {
  return NativeModules.SpotAndroid.search(term)
      .then(res => {
        console.log(res)
        return JSON.parse(res)
      })
}

spotcontrol.doSuggest = function(term: string) : Promise<SuggestResult> {
  return NativeModules.SpotAndroid.search(term)
      .then(res => JSON.parse(res))
}

spotcontrol.getDevices = function() {
  console.log("get devices")
  return Promise.all([
      spotcontrol.listMdnsDevices(),
      spotcontrol.hello()
  ]).then((values) => {
    var mdns = JSON.parse(values[0])
        .filter((md) => !SpotDevices.find((d) => d.Url == md.Url))

    return Promise.all(
      mdns.map(
        (device) => fetch(device.Url + '?action=getInfo').then((res) => res.json())
      )
    ).then((info) => {
      console.log('fetched info', info)
      return mdns = mdns.map((d,i) => {
        d.ident = info[i].deviceID
        d.name = info[i].remoteName
        return d;
      })
      .filter((md) => !SpotDevices.find((d) => {
        if(d.ident == md.ident) {
          d.Url = md.Url;
          return true;
        }
      }))
      .concat(SpotDevices)
    })
    .then((devices) => {
      console.log("get  devices", devices)
      SpotDevices = devices;
      return SpotDevices;
    })
  });
}

export default spotcontrol
