import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Component } from 'react-native'

let store = createStore(todoApp)

class Root extends Component {
  render() {
    return (
    	<Provider store={store}>

    	</Provider>
    );
  }
}