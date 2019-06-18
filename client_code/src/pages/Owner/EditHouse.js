
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image
}from 'react-native';

import '../../components/Global';
const styles = require('../../Style');
import * as TMananger from '../../components/TokenManager'

export default class EditHouse extends React.Component {
  constructor(props) {
    super(props)

  }

  static navigationOptions = {
    title: 'EditHouse'
  };

  
  async componentDidMount(){

    const _id = this.props.navigation.state.params._id
    const price= this.props.navigation.getParam('price', null)
    const forRent= this.props.navigation.getParam('forRent', null)
    const lng=this.props.navigation.getParam('lng', null)
    const lat= this.props.navigation.getParam('lat', null)
    const discription= this.props.navigation.getParam('discription', null)

    this.setState({
        
        
    })
  }



  async editHousing() {
    // let buffer = await TMananger.checkAuthTime(this)
    // if(buffer == 'uhoh'){
    //   return
    // }

    // let AuthToken
    // try {
    //   AuthToken =  await AsyncStorage.getItem(my_token_key);
    // } catch (error) {
    //   console.log(error.message);
    // }
    

    // let requestBody = {
    //   query: `
    //     mutation {
    //       updateUserProfile(bio: "${this.state.bio}"){
    //         bio
    //       }
    //     }
    //   `
    // };
    // let resData = await fetch(IP, {
    //   method: 'POST',
    //   body: JSON.stringify(requestBody),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + AuthToken
    //   }
    // })
    // .then(res => {
    //   if(res.status !== 200 && res.status !== 201 && res.status !== 500){
    //     throw new Error("Failed!");
    //   }
    //   return res.json();
    // })
    // .catch(err => {
    //   console.log(err);
    //   this.props.navigation.navigate('Auth')
    //   return;
    // });
    // try {
    //   this.setState({ save_text: "Save" })
    //   await AsyncStorage.setItem(my_bio_Key, this.state.bio)
    // } catch (error) {
    //   console.log(error)
    //   this.props.navigation.navigate('Auth')
    // }
    
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
            {/* <TextInput style={styles.bioBox}
              multiline = {true}
              editable = {true}
              maxLength = {200}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholderTextColor="rgba(0,0,0,.5)"
              onChangeText= {//this.handleBio}
            }
              value={//this.state.bio}
        }
            /> */}
          
          <TouchableOpacity style = {styles.SaveButton} onPress={()=>{}}>
            <Text style = {styles.buttonText}>yeet text</Text>
          </TouchableOpacity>
        </View>
    );
    
  }

  
}



