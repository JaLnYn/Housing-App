
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';
import './Global'


export async function setNewToken(){
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
        }
    } catch (error) {
        console.log('ERROR WITH AUTO LOGIN', error);
    }
    
    if (email.trim().length === 0 || password.trim().length === 0) {
        return false;
    }

    let requestBody = {
    query: `
        query {
        login(email: "${email}", password: "${password}") {
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
        return false;
    });
    try {
        if(resData.errors && resData.errors.length > 0){
            throw new Error(resData.errors[0].message);
        }
        if (resData.data.login.token) {
            myUserId = resData.data.login.userId.toString();
            
            await AsyncStorage.setItem(my_token_key, resData.data.login.token.toString())
            await AsyncStorage.setItem(my_userId_key, resData.data.login.userId.toString())
            await AsyncStorage.setItem(my_tokenEx_key, resData.data.login.tokenExpiration.toString())
            await AsyncStorage.setItem(my_tokenStartTime_key, Date.now().toString())
            return true
        }
    } catch (error) {
        throw error;
    }   
    return false
}

export async function checkAuthTime(newThis){
    try {
        let startTime = await AsyncStorage.getItem(my_tokenStartTime_key);
        let expireTime = await AsyncStorage.getItem(my_tokenEx_key);
        let AuthToken = await AsyncStorage.getItem(my_token_key);
        let currentTime = Date.now().toString()
        if(parseInt(currentTime) - parseInt(startTime) >= expireTime * 59000){
            //token has expired
            if(!setNewToken()){
                await Keychain.resetGenericPassword()
                newThis.props.navigation.navigate('Auth')
                return "uhoh"
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}