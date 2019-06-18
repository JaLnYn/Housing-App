import React, {Component} from 'react';

import {
  Text,
  View,
  Button,
  TextInput,
TouchableOpacity
}from 'react-native';

import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';
import '../../components/Global';
const styles = require('../../Style');
import * as TMananger from '../../components/TokenManager'


export default class OwnerProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      bio: '',
      save_text: 'Save'
    }

  }
  static navigationOptions = {
    title: 'Profile'
  };

  async componentDidMount(){
    const myBio = await AsyncStorage.getItem(my_bio_Key)
    
    this.setState({ bio: myBio })
  }

  async logout(){

    await Keychain.resetGenericPassword()
    await Keychain.resetGenericPassword()
    this.props.navigation.navigate("Auth")
  }

  async handleChangeIsTenant(){
    TMananger.checkAuthTime(this)
    let AuthToken
    try {
      AuthToken =  await AsyncStorage.getItem(my_token_key);
    } catch (error) {
      console.log(error.message);
    }
    
    let requestBody = {
      query: `
        mutation {
          changeUserTeanentStatus(isTenant: true) {
            isTenant
          }
        }
      `
    };
    let resData = await fetch(IP, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + AuthToken
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
      this.props.navigation.navigate('Auth')
      return;
    });
    console.log(resData)
    try {
      if(resData.data.changeUserTeanentStatus.isTenant){
        this.props.navigation.navigate('TenantProfile');
      }else{
        this.props.navigation.navigate('OwnerProfile');
      }
    } catch (error) {
      console.log(error)
      this.props.navigation.navigate('Auth')
    }
    
  }

  async save() {
    let buffer = await TMananger.checkAuthTime(this)
    if(buffer == 'uhoh'){
      return
    }
    this.setState({ save_text: "Saving..." })
    let AuthToken
    try {
      AuthToken =  await AsyncStorage.getItem(my_token_key);
    } catch (error) {
      console.log(error.message);
    }
    buffer = await AsyncStorage.getItem(my_bio_Key)
    if(this.state.bio === buffer){
      this.setState({ save_text: "Save" })
      return
    }

    let requestBody = {
      query: `
        mutation {
          updateUserProfile(bio: "${this.state.bio}"){
            bio
          }
        }
      `
    };
    let resData = await fetch(IP, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + AuthToken
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
      this.props.navigation.navigate('Auth')
      return;
    });
    try {
      this.setState({ save_text: "Save" })
      await AsyncStorage.setItem(my_bio_Key, this.state.bio)
    } catch (error) {
      console.log(error)
      this.props.navigation.navigate('Auth')
    }
    
  }

  handleBio = (text) => {
    this.setState({ bio: text });
  }

  render() {
    return (
        <View style = {{flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',}}>
            <Text>
                profilePichere
            </Text>
            <Text>
                bio
            </Text>
            <TextInput style={styles.bioBox}
              multiline = {true}
              editable = {true}
              maxLength = {200}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholderTextColor="rgba(0,0,0,.5)"
              onChangeText= {this.handleBio}
              value={this.state.bio}
            />
          
          <TouchableOpacity style = {styles.SaveButton} onPress={()=>{this.save()}}>
            <Text style = {styles.buttonText}>{this.state.save_text}</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.TenantSwitchButton} onPress={()=>{this.handleChangeIsTenant()}}>
            <Text style = {styles.buttonText}>Changaroooo</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.LogoutButton} onPress={()=>{this.logout()}}>
            <Text style = {styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
    );
    
  }

  
}
