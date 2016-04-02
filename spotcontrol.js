/* @flow */
import {
  NativeModules,
  DeviceEventEmitter
} from 'react-native'

const spotcontrol = NativeModules.SpotAndroid;

let SpotDevices = [];

DeviceEventEmitter.addListener('SpotDeviceNotify', (data) => {
  var update = JSON.parse(data);

  //hello
  if (update.typ == 1) {
  }

  //notify
  if(update.typ == 10) {
    if (!SpotDevices.find((d) => d.ident == update.ident)) {
      SpotDevices.push({
        name: update.device_state.name,
        ident: update.ident
      })
      DeviceEventEmitter.emit('SpotDeviceAdd', SpotDevices)
    }
  }

});

spotcontrol.getDevices = function() {
  console.log("get devices")
  return Promise.all([
      spotcontrol.listMdnsDevices(),
      spotcontrol.hello()
  ]).then((values) => {
    var mdns = JSON.parse(values[0])
        .filter((md) => SpotDevices.find((d) => d.Url == md.Url))

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
      .filter((md) => !connect.find((d) => {
        if(d.ident == md.Ident) {
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

export default spotcontrol;
