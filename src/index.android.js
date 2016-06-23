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
  DeviceEventEmitter,
  AsyncStorage,
  ProgressBarAndroid,
  Animated,
  Dimensions,
  TouchableOpacity,
  Picker
} from 'react-native';

import spotcontrol from './spotcontrol.js'

import Search from './search.js'

var {
  height: deviceHeight
} = Dimensions.get('window');

var TimerMixin = require('react-timer-mixin');

var MovingBar = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      progress: 0,
    };
  },

  componentDidMount: function() {
    this.setInterval(
      () => {
        var progress = (this.state.progress + 0.02) % 1;
        this.setState({progress: progress});
      }, 25
    );
  },

  render: function() {
    return <ProgressBarAndroid progress={this.state.progress} {...this.props} />;
  },
});

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.state.offset.setValue(deviceHeight);
    Animated.parallel([
      Animated.timing(this.state.offset, {
        toValue: 0,
        duration: 300
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 300
      })
    ]).start();

    this.props.closePromise &&
        this.props.closePromise.then(() => this.closeModal());
  }

  closeModal() {
    Animated.parallel([
      Animated.timing(this.state.offset, {
        toValue: deviceHeight,
        duration: 300,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 300,
      })
    ]).start(this.props.closeModal);
  }

  render() {
    return (
        <Animated.View style={[styles.modal, styles.flexCenter, {opacity: this.state.opacity}]}>
          <Animated.View style={[styles.modalBox, {transform: [{translateY: this.state.offset}]}]}>
            {React.Children.only(this.props.children)}
          </Animated.View>
        </Animated.View>
    )
  }
}

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      blob: '',
      showModal: false,
      devices: []
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('SpotDeviceAdd', (devices) => {
      this.setState({devices: devices})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Username </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.text}
        />
        <Text> Password </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({password: text})}
          onSubmitEditing={this.onLoginPress.bind(this)}
          value={this.state.text}
        />
        <TouchableHighlight
          onPress={this.onLoginPress.bind(this)}
          style={styles.button}
          underlayColor="grey">
          <Text>
            Login
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
        {this.state.showModal ?
          <Modal closeModal={() => this.setState({showModal: false})}
                 closePromise={this.state.loginPromise}>
            <View>
              <TouchableOpacity onPress={() => this.closeModal()}>
                <Text style={{color: '#000'}}>Close Menu</Text>
              </TouchableOpacity>
              <MovingBar color="blue"></MovingBar>
            </View>
          </Modal>
          :
          null
        }
        <Picker
          onValueChange={(ident) => this.onSelect(ident)}
          selectedValue={this.state.selected}>
          {
            this.state.devices.map((d) =>
              <Picker.Item label={d.name} value={d.ident} key={d.ident}/>
            )
          }
        </Picker>
        <Search ident={this.state.selected}></Search>
      </View>
    );
  }

  onSelect(ident) {
     this.setState({selected: ident});
     var device = this.state.devices.find((d) => d.ident == ident);
     console.log('select', device)
     if (device.Url && !device.isConnected) {
       spotcontrol.connectToDevice(device.Url)
     }
  }

  onLoginPress() {
    AsyncStorage.clear()
    Promise.all([
      AsyncStorage.getItem('username'),
      AsyncStorage.getItem('decodedBlob'),
    ])
    .then((values) => {
      console.log("vals", values)
      return spotcontrol.loginBlob(values[0], values[1])
    })
    .then(() => this.getDevices())


    //then(() =>
    // .then(()=> NativeModules.SpotAndroid.getUpdates())
    // .catch(() => console.log("catch"))

    // DeviceEventEmitter.addListener('SpotDeviceNotify', (data) => {
    //   console.log("data", data)
    //   var update = JSON.parse(data);
    //
    //   console.log(update)
    //
    //   if (!this.state.devices.find((d) => d.Ident == update.Ident)) {
    //     this.getDevices();
    //   }
    // });


    //this.setState({showModal: true})
    //NativeModules.SpotAndroid.login(this.state.username, this.state.password);
  }

  getDevices() {
    spotcontrol.getDevices()
    .then((devices) => {
      console.log('got devices', devices)
      this.setState({devices: devices})
    })
  }

  onDiscoverPress() {
    var loginPromise = spotcontrol.startDiscovery()
      .then((blob) => {
        console.log('got blob', blob)
        this.setState({
          username: blob.username,
          blob: blob.blob
        });
        return Promise.all([
          AsyncStorage.setItem('decodedBlob', blob.blob),
          AsyncStorage.setItem('username', blob.username),
          spotcontrol.loginBlob(blob.username, blob.blob)
        ]);
      }).then(() => this.getDevices());
    this.setState({
      loginPromise: loginPromise,
      showModal: true
    })

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
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  modalBox: {
    position: 'absolute',
    backgroundColor: 'rgb(256, 256, 256)',
    right: 0,
    left: 0,
    top: 100,
    height: 300
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
