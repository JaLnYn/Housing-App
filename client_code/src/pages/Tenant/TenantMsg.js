import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput
}from 'react-native';



export default class TenantMsg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  static navigationOptions = {
    title: 'TenantMsg'
  };


  render() {
    return (
        <View style>
            <Text>tenant msg</Text>
        </View>
    );
    
  }

  
}

