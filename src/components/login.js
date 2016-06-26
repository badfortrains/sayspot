// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

export default class AwesomeProject extends Component {

  props: {
    loginPassword: (u: string, p: string) => void,
    loginDiscovery: () => void
  };

  state: {
    username: string,
    password: string
  };

  constructor(props: any, context: any) {
    super(props, context)
    this.state = {
      username: '',
      password: '',
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Username </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <Text> Password </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          onSubmitEditing={this.onLoginPress.bind(this)}
          value={this.state.password}
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
      </View>
    );
  };

  onLoginPress() {
    this.props.loginPassword(this.state.username, this.state.password)
  };

  onDiscoverPress() {
    this.props.loginDiscovery(this.state.username, this.state.password)
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
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
  }
});
