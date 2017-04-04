/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    } from 'react-native';
import Main from './Main';

export default class RNnews extends Component {
  render() {
    return <Main/>;
  }
}


AppRegistry.registerComponent('RNnews', () => RNnews);
