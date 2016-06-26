// @flow

import {
  Text,
  View
} from 'react-native';
import Link from '../containers/navLink'

import React from 'react'

export default (props: any) => (
  <View>
    <Link text="Settings" link="settings"></Link>
    <Text>HOME - Definitely not settings page</Text>
  </View>
);
