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

const styles = require('../Style')

const loginMessage1 = "Don't have an account?"
const loginMessage2 = "Sign Up!"
const signUpMessage1 = "Already have an account?"
const signUpMessage2 = "Log in!"
const buttonMessageSU = "Sign Up"
const buttonMessageLI = "Log In"


export default class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
      buttonMessage: buttonMessageLI,
      message1: loginMessage1,
      message2: loginMessage2,    
      errorMessage: "",
      email: '',
      password: '',
      currentWarning: '',
      profileEmail: '',
      profileBio: '',
      profileIsTenant: '',
      
    };
  }
  
  static navigationOptions = {
    title: 'Auth',
    header: null
  };

  handleEmail = (text) => {
    this.setState({ email: text })
  }
  handlePassword = (text) => {
      this.setState({ password: text })
  }


  switchModeHandler () {
    if(this.state.isLogin){
      this.setState({isLogin: false,
        buttonMessage: buttonMessageSU,
        message1: signUpMessage1,
        message2: signUpMessage2
      }
      )
    }else{
      this.setState({isLogin: true,
        buttonMessage: buttonMessageLI,
        message1: loginMessage1,
        message2: loginMessage2
      }
      )
    }
    //console.log("b: " + this.state.buttonMessage + "l" + this.state.message1 + this.state.message2);
  };
    


  async connect(email, password){
    await Keychain.setGenericPassword(email, password);
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
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

    if (!this.state.isLogin) {
      
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    this.setState({
      errorMessage: "loading.."
    });
    let resData = await fetch(IP, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        this.setState({isLogin: true,
          buttonMessage: buttonMessageLI,
          message1: loginMessage1,
          message2: loginMessage2,
          errorMessage: ""
        });
        if(res.status !== 200 && res.status !== 201 && res.status !== 500){
          throw new Error("Failed!");
        }
        return res.json();
      })
      .catch(err => {
        console.log(err);
        return;
      });
      let myUserId;
      let isTenant
      try {
        if(resData.errors && resData.errors.length > 0){
          console.log(resData.errors[0].message);
          this.setState({
            errorMessage: resData.errors[0].message
          });
          
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

          if(isTenant){
            this.props.navigation.navigate('TNav');
          }else{
            this.props.navigation.navigate('ONav');
          }
        }
      } catch (error) {
        
      }
  }


  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.container}>
          <TextInput style={styles.inputBox}
            name="email"
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder='Email'
            placeholderTextColor="rgba(0,0,0,.5)"
            keyboardType="email-address"
            onSubmitEditing={()=>this.password.focus()}
            onChangeText= {this.handleEmail}
            value={this.state.email}
            />
          <TextInput style={styles.inputBox}
            name="password"
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor="rgba(0,0,0,.5)"
            ref={(input) => this.password = input}
            onChangeText= {this.handlePassword}
            value={this.state.password}
             />
          <Text style={styles.submitButton}>
            {this.state.errorMessage}
          </Text>
          <TouchableOpacity style={styles.submitButton} onPress={async () => {
            await this.connect(this.state.email,this.state.password);  
          }} >
            <Text style={styles.buttonText}>{this.state.buttonMessage}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.enterTextContainer}>
          <Text style={styles.normalText}>{this.state.message1}</Text>
          <TouchableOpacity onPress={() => {this.switchModeHandler()}}>
            <Text style={styles.textButton} >{this.state.message2}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    
  }

  
}

