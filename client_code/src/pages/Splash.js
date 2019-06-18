import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
}from 'react-native';
import '../components/Global'
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';
import * as Tmanager from '../components/TokenManager'

const styles = require('../Style')

const loginMessage1 = "Don't have an account?"
const loginMessage2 = "Sign Up!"
const signUpMessage1 = "Already have an account?"
const signUpMessage2 = "Log in!"
const buttonMessageSU = "Sign Up"
const buttonMessageLI = "Log In"


export default class Splash extends React.Component {
  constructor(props) {
    super(props)
  }
  
  static navigationOptions = {
    title: 'Auth',
    header: null
  };

  async componentDidMount(){
    try {
      let email
      let password
      try {
          // Retreive the credentials
          const credentials = await Keychain.getGenericPassword();
          if (credentials) {
              email = credentials.username;
              password = credentials.password;
          } else {
              console.log('No credentials stored')
              this.props.navigation.navigate('Auth');
          }
      } catch (error) {
          console.log('ERROR WITH AUTO LOGIN', error);
          this.props.navigation.navigate('Auth');
      }
      let requestBody = {
        query: `
          query {
            login(email: "${email}", password: "${password}") {
              user {
                email
                bio
                isTenant
              }
              userId
              token
              tokenExpiration
            }
          }
        `
      };

      let resData = await fetch(IP, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if(res.status !== 200 && res.status !== 201 && res.status !== 500){
          throw new Error("Failed!");
        }
        return res.json();
      })
      .catch(err => {
        console.log(err);
        this.props.navigation.navigate('Auth');
        return;
      });
      let isTenant
      try {
        if(resData.errors && resData.errors.length > 0){
          console.log(resData.errors[0].message);
          
          
          throw new Error(resData.errors[0].message);
        }
        if (resData.data.login.token) {
          myUserId = resData.data.login.userId.toString();
          
          await AsyncStorage.setItem(my_token_key, resData.data.login.token.toString())
          await AsyncStorage.setItem(my_userId_key, resData.data.login.userId.toString())
          await AsyncStorage.setItem(my_tokenEx_key, resData.data.login.tokenExpiration.toString())
          await AsyncStorage.setItem(my_email_Key, resData.data.login.user.email.toString())
          await AsyncStorage.setItem(my_bio_Key, resData.data.login.user.bio.toString())
          await AsyncStorage.setItem(my_isTenant_Key, resData.data.login.user.isTenant.toString())
          await AsyncStorage.setItem(my_tokenStartTime_key, Date.now().toString())
          isTenant = resData.data.login.user.isTenant;
          console.log("autoLoginSucc")
          if(isTenant){
            this.props.navigation.navigate('TNav');
            return
          }else{
            this.props.navigation.navigate('ONav');
            return
          }
        }
      } catch (error) {
        throw error
      }
      this.props.navigation.navigate('Auth');
    } catch (error) {
      this.props.navigation.navigate('Auth');
      console.log('ERROR WITH AUTO LOGIN', error);
      
    }
    
  }

  render() {
    return (
      <View style = {{
            backgroundColor: '#607d8b',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'}
        }>
        <Text>
            Project K2
        </Text>
      </View>
    );
    
  }

  
}

