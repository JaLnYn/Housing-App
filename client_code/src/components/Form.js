import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
}from 'react-native';





export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    
  }
  state = {
    email: '',
    password: ''
  }
  handleEmail = (text) => {
      this.setState({ email: text })
  }
  handlePassword = (text) => {
      this.setState({ password: text })
  }

  render() {
    return (
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
            <TouchableOpacity style={styles.button} 
              
              onPress={() => {this.props.buttonFunc(this.state.email,this.state.password)}} >
                <Text style={styles.buttonText}>{this.props.type}</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  inputBox: {
      width:300,
      height: 36,
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius:15,
      paddingHorizontal:12,
      marginVertical:8,
      fontSize: 16,
  },
  button:{
    width:300,
    height:36,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 6
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color: 'rgba(255,255,255,0.7)',
    textAlign:'center'
  }
});
