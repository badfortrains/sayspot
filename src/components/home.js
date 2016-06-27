// @flow

import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Search from './search'
import Link from '../containers/navLink'

import React from 'react'

export default (props: any) => (
  <View style={styles.container}>
    <Link text="Settings" link="settings"></Link>
    <Search style={styles.container}></Search>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
