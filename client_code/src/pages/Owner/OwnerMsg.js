import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput
}from 'react-native';



export default class OwnerMsg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  static navigationOptions = {
    title: 'OwnerMsg'
  };

  render() {
    return (
        <View style>
            <Text>owner msg</Text>
        </View>
    );
    
  }

  
}

