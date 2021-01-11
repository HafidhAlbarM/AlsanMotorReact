import React, { useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, TextInput, ToastAndroid } from "react-native";
import { Container, Content, View, Text } from 'native-base';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

const {height, width} = Dimensions.get("window");



const Registration1 = ({ navigation }) => {
      console.log('urlnya di registrasi',API_URL);
      const dataUser = navigation.state.params.dataUser;

      const [plat_nomor, setPlatNomor] = useState("");
      const [merk_mobil, setMerkMobil] = useState("");
      const [nama_mobil, setNamaMobil] = useState("");

      const handleSubmit = ()=>{
        let message = "";

        if(plat_nomor == ""){
          message = "Plat Nomor harus diisi";
        }else if(merk_mobil == ""){
          message = "Merk Mobil harus diisi";
        }else if(nama_mobil == ""){
          message = "Nama Mobil harus diisi";
        }else{
          message = "";
        }

        if(message!=""){
          ToastAndroid.show(message, ToastAndroid.SHORT);
        }else{
          const dataInsert = {
            "User_Id":dataUser.User_Id,
            "email":dataUser.email,
            "Password":dataUser.Password,
            "plat_nomor":plat_nomor,
            "merk_mobil":merk_mobil,
            "nama_mobil":nama_mobil,
            "pemilik":dataUser.pemilik,
            "alamat": dataUser.alamat
          }
  
          axios.post(`${API_URL}user/register`, dataInsert)
          .then(res => {
            if(res.data.success){
              navigation.navigate('LoginScreen');
              ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
            }else{
              ToastAndroid.show(res.data.info, ToastAndroid.SHORT);
            }
          });
        }
      }
      

      return (
        <Container>
          <ImageBackground
          source={ require('../../../assets/images/background.jpg') }
          style={{width: '100%', height: '100%'}}
          > 
          <Content>
              <View style={ style.viewContent }>
                  <View style={{flexDirection:"column", flex:1}}>
                      <Text style={{fontWeight: 'bold', marginBottom:15, fontSize:34}}>Registration</Text>
                      <Text style={{fontWeight: 'bold', marginBottom:50, fontSize:25}}>Car's data</Text>

                      <Text style={{fontWeight: 'bold', marginBottom:15}}>Plate Number</Text>
                      <TextInput placeholder="B XXXX" style={style.textInputStyle} onChangeText={(value)=>{setPlatNomor(value)}}/>

                      <Text style={{fontWeight: 'bold', marginBottom:15}}>Car Brand</Text>
                      <TextInput placeholder="Toyota" style={style.textInputStyle} onChangeText={(value)=>{setMerkMobil(value)}}/>

                      <Text style={{fontWeight: 'bold', marginBottom:15}}>Car Name</Text>
                      <TextInput placeholder="Yaris" style={style.textInputStyle} onChangeText={(value)=>{setNamaMobil(value)}}/>

                      <TouchableOpacity onPress={()=>{handleSubmit()}}>
                        <View style={ style.buttonLoginStyle }>
                            <Text style={{fontWeight: 'bold'}}>Register</Text>
                        </View>
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
    textInputStyle:{
        backgroundColor:"white", 
        borderRadius:10, 
        marginBottom:15
    }
});

export default Registration1;
