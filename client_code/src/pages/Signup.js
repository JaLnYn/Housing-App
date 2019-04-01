import React, {Component} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';

import Form from '../components/Form';

const styles = require('../Style')




export default class Signup extends React.Component {
    static navigationOptions = {
      title: 'Signup',
      header: null
    };
  
  signupConnect(email, password){
    console.log("sign up: "+email + " password: "+password);
  }
  render() {
    return (
        <View style = {styles.container}>
          <Form type='Sign Up' buttonFunc={this.signupConnect}/>
          <View style={styles.enterTextContainer}>
            <Text style={styles.normalText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.button} >Login!</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

