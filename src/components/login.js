import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

class AwesomeProject extends Component {

  constructor() {
    this.setState({
      username: '',
      password: '',
    })
  }

  render() {
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
    </View>;
  }
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
