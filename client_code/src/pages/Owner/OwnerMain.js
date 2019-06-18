import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
}from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import '../../components/Global';
const styles = require('../../Style');
import * as TMananger from '../../components/TokenManager'

let imgaddy = 'http://www.imagemagick.org/Usage/canvas/canvas_khaki.gif'




export default class OwnerMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    }
  }

  static navigationOptions = {
    title: 'OwnerMain',
  };

  async fetchHouses(){
    let buffer = await TMananger.checkAuthTime(this)
    if(buffer == 'uhoh'){
      return
    }
    let myId
    let AuthToken
    try {
      AuthToken =  await AsyncStorage.getItem(my_token_key);
      myId = await AsyncStorage.getItem(my_userId_key);
    } catch (error) {
      console.log(error);
    }
    console.log(myId)
    let requestBody = {
      query: `
        query {
          oneUser(userId: "${myId}"){
            myHouse{
              _id
              forRent
              price 
              lng 
              lat 
              discription
            }
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
      this.setState({
        data: resData.data.oneUser.myHouse
      })
    } catch (error) {
      console.log(error)
      this.props.navigation.navigate('Auth')
    }
  }

  async componentDidMount(){
    //make request to list
    this.fetchHouses()
  }



  async addHousing() {
    let buffer = await TMananger.checkAuthTime(this)
    if(buffer == 'uhoh'){
      return
    }

    let AuthToken
    try {
      AuthToken =  await AsyncStorage.getItem(my_token_key);
    } catch (error) {
      console.log(error.message);
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

  renderItem = ({item}) => {
    //console.log(item)
    return(
        <TouchableOpacity style={{height:100, flex: 1 }} 
        onPress={() => {this.props.navigation.navigate('EditHouse',{_id: item._id, forRent:item.forRent,
          price:item.price ,
          lng:item.lng ,
          lat:item.lat ,
          discription:item.discription})}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style = {{flex: 1, width:100, height:100}}>
              <Image style = {{flex: 1, width:100, height:100}} source={{uri: imgaddy}}/>
            </View>
            <View style = {{flex: 1, width:100, height:100}}>
              <Text>
                  {item.lng} {item.lat}
              </Text>
              
            </View>
          </View>
        </TouchableOpacity>
    )
  }


  render() {
    return (
        <View style = {{flex: 1,alignContent: 'center'}}>
          <View style = {{
            flex: 0.2, 
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',}}>
          </View>
          <FlatList style = {{flex: 0.6}}
            data={this.state.data}
            renderItem= {this.renderItem}
          />

          <View style = {{
            flex: 0.2, 
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',}}>
            <TouchableOpacity style = {{
            flex: 1, 
            alignSelf: 'center',
            backgroundColor: 'rgba(0,0,200,0.5)',
            alignContent: 'center',
            justifyContent: 'center',flexDirection: 'row', width: 1000}} onPress={()=>{
              this.props.navigation.navigate('AddHouse')
              return
              }}>
              <Text style = {{alignSelf: 'center'}}>Add Housing</Text>
            </TouchableOpacity>
          </View>
          
        </View>
    );
    
  }

  
}



