import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput
}from 'react-native';



export default class TenantMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  static navigationOptions = {
    title: 'TenantMain'
  };


  render() {
    return (
        <View style>
            <Text>tenant main</Text>
        </View>
    );
    
  }

  
}

