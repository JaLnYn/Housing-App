import {StyleSheet} from 'react-native'


module.exports = StyleSheet.create({
    container: {
        backgroundColor: '#607d8b',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    enterTextContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row'
    },
    normalText:{
      color: 'rgba(0,0,0,0.7)',
      fontSize: 16
    },
    textButton:{
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '500'
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
    submitButton:{
      width:300,
      height:36,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 6
    },
    bioBox: {
      borderColor: 'gray',
      width:300,
      height: 100,
      backgroundColor: 'rgba(100,100,100,0.3)',
      borderRadius:15,
      paddingHorizontal:12,
      marginVertical:8,
      fontSize: 16,
    },
    SaveButton: {
      width:300,
      height:36,
      backgroundColor: 'rgba(100,0,0,0.3)',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 6
    },
    LogoutButton: {
      width:300,
      height:36,
      backgroundColor: 'rgba(200,0,0,0.3)',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 6
    },
    TenantSwitchButton:{
      width:300,
      height:36,
      backgroundColor: 'rgba(0,0,100,0.3)',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 6
    },
    OwnerSwitchButton:{
      width:300,
      height:36,
      backgroundColor: 'rgba(0,100,0,0.3)',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 6
    },
    ProfileText:{
      color: 'rgba(0,0,0,0.7)',
      fontSize: 16
    },
    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color: 'rgba(255,255,255,0.7)',
      textAlign:'center'
    },
    
  });
  
