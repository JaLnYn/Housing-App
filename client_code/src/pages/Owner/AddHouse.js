
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button
}from 'react-native';

import '../../components/Global';
const styles = require('../../Style');
import * as TMananger from '../../components/TokenManager'

import ImagePicker from "react-native-image-picker"

export default class newHouse extends React.Component {
  constructor(props) {
    super(props)

  }

  static navigationOptions = {
    title: 'EditHouse'
  };

  
  async componentDidMount(){
    // const _id = this.props.navigation.state.params._id
    // const price= this.props.navigation.getParam('price', null)
    // const forRent= this.props.navigation.getParam('forRent', null)
    // const lng=this.props.navigation.getParam('lng', null)
    // const lat= this.props.navigation.getParam('lat', null)
    // const discription= this.props.navigation.getParam('discription', null)

    this.setState({
        
        
    })
  }



  async editHousing() {
    
  }

  handleChoosePhoto = () =>{
      const options = {};
      ImagePicker.launchImageLibrary(options,response=>{
          console.log("response",response);
      })
  }


  render() {
    return (
        <View style = {{flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',}}>
            <Button
                title="upload photos"
                onPress={this.handleChoosePhoto}
            />
            
          
            <TouchableOpacity style = {styles.SaveButton} onPress={()=>{}}>
                <Text style = {styles.buttonText}>yeet text</Text>
            </TouchableOpacity>
        </View>
    );
    
  }

  
}



