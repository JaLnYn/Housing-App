import React, {Component} from 'react';
import { Text, View, TouchableOpacity, AsyncStorage} from 'react-native';

import Form from '../components/Form';
const styles = require('../Style')




export default class Login extends React.Component {
  
  static navigationOptions = {
    title: 'Login',
    header: null
  };

  async getToken(){
    const credentials = await Keychain.getGenericPassword();
    let loginSuc = 0;
    try {
      // Retreive the credentials
      if (credentials) {
        console.log('Credentials successfully loaded for user ' + credentials.username);
      } else {
        console.log('No credentials stored')
      }
    } catch (error) {
      console.log('Keychain couldn\'t be accessed!', error);
    }

    // login code here (if login suc, store token and set loginSuc)



    return loginSuc;

  }

  loginConnect(email, password){
    console.log("login: "+email + " password: "+password);
  }

  render() {
    return (
        <View style = {styles.container}>
          <Form type='Login' buttonFunc={this.loginConnect}/>
          <View style={styles.enterTextContainer}>
            <Text style={styles.normalText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.button} >Sign up!</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

