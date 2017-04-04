/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
    StyleSheet,
    Image
} from 'react-native';
import Main from './Main';

export default class RNnews extends Component {
  render() {
    return <Main/>;
  }
}
const styles = StyleSheet.create({
  backimagestyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});

AppRegistry.registerComponent('RNnews', () => RNnews);
