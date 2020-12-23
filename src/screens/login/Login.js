import React, { useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, TextInput, ToastAndroid } from "react-native";
import { Container, Content, View, Text, Input } from 'native-base';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from 'react-native-dotenv';

const {height, width} = Dimensions.get("window");

const Login = ({ navigation }) => {
      const [User_Id, setUserId] = useState("");
      const [Password, setPassword] = useState("");

      const handleLogin = () => {
        const dataLogin = {
          User_Id: User_Id,
          Password: Password
        }

        axios.post(`${API_URL}user/login`, dataLogin)
        .then(res => {
          // console.log(res.data);
          if(res.data.data.length>0){
            const dataLoginAsync = res.data.data;

            try {
              const jsonValue = JSON.stringify(dataLoginAsync)
              AsyncStorage.setItem('@dataUser', jsonValue)
              console.log('sukses', jsonValue);
              setUserId("");
              setPassword("");
            } catch (e) {
              console.log(e);
            }
            
            
            navigation.navigate('HomeScreen');
            ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
          }else{
            ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
          }
        })
      }

      // console.log(API_URL);
      return (
        <Container>
          <ImageBackground
          source={ require('../../../assets/images/background.jpg') }
          style={{width: '100%', height: '100%'}}
          > 
          <Content>
              <View style={ style.viewContent }>
                  <View style={{flexDirection:"column", flex:1}}>
                      <Text style={{fontWeight: 'bold', marginBottom:15}}>User Id/Email</Text>
                      <TextInput placeholder="User Id" style={style.textInputStyle} onChangeText={(value)=>{setUserId(value)}} value={User_Id}/>

                      <Text style={{fontWeight: 'bold', marginBottom:15}}>Password</Text>
                      <TextInput placeholder="Password" style={style.textInputStyle} secureTextEntry={true} onChangeText={(value)=>{setPassword(value)}} value={Password}/>
                      
                      <TouchableOpacity onPress={()=>handleLogin()}>
                        <View style={ style.buttonLoginStyle }>
                            <Text style={{fontWeight: 'bold'}}>Login</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>navigation.navigate("Registration1Screen")} style={style.registerLink}>
                        <Text>Don't have an accout? click here</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </Content>
          </ImageBackground>
        </Container>
      )
};

const style = StyleSheet.create({
    viewContent: {
      flexDirection:"row", 
      height: height-(height*0.10),
      paddingVertical:100,
      paddingHorizontal:50
    },
    buttonLoginStyle: {
        flexDirection:"row", 
        height: 60, 
        marginHorizontal:20, 
        backgroundColor:"#f5c542", 
        borderRadius:20,
        justifyContent:"center",
        padding:20,
    },
    registerLink: {
      flexDirection:"row",
      marginHorizontal:10,
      paddingTop:10, 
      borderRadius:20,
      justifyContent:"center"
  },
    textInputStyle:{
        backgroundColor:"white", 
        borderRadius:10, 
        marginBottom:15
    }
});

export default Login;
