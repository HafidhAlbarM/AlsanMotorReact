import React, { useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, TextInput, ToastAndroid } from "react-native";
import { Container, Content, View, Text } from 'native-base';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

const {height, width} = Dimensions.get("window");

const Registration1 = ({ navigation }) => {
      const [pemilik, setPemilik] = useState('');
      const [alamat, setAalamat] = useState('');
      const [User_Id, setUserId] = useState('');
      const [email, setEmail] = useState('');
      const [Password, setPassword] = useState('');

      const dataUser = {
          pemilik: pemilik,
          alamat: alamat,
          User_Id: User_Id,
          email: email,
          Password: Password
      }

      const validasi = ()=>{
          let message = "";
          if(dataUser.User_Id == "") {
            message="User Id harus di isi";
          }else if(dataUser.alamat == ""){
            message="Alamat harus diisi";
          }else if(dataUser.email == ""){
            message="E Mail Id harus di isi";
          }else if(dataUser.Password == ""){
            message="Password harus di isi";
          }else{
            message = "";
          }

          if(message==""){
            navigation.navigate('Registration2Screen', {dataUser: dataUser})
          }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
          }
      }

      return (
        <Container>
          <ImageBackground
          source={ require('../../../assets/images/background.jpg') }
          style={{width: '100%', height: '100%'}}
          > 
          <Content>
              <ScrollView style={{ flex: 1, height:'100%', width:'100%', paddingVertical:100,
  paddingHorizontal:50 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flexDirection:"column", flex:1}}>
                    <Text style={{fontWeight: 'bold', marginBottom:15, fontSize:34}}>Registration</Text>
                    <Text style={{fontWeight: 'bold', marginBottom:50, fontSize:25}}>Car Owner's data</Text>

                    <Text style={{fontWeight: 'bold', marginBottom:15}}>Car Owner's Name</Text>
                    <TextInput placeholder="User Id" style={style.textInputStyle} onChangeText={(value)=>{setPemilik(value)}}/>

                    <Text style={{fontWeight: 'bold', marginBottom:15}}>Car Owner's Address</Text>
                    <TextInput placeholder="Address" style={style.textInputStyle} onChangeText={(value)=>{setAalamat(value)}}/>

                    <Text style={{fontWeight: 'bold', marginBottom:15}}>User Id</Text>
                    <TextInput placeholder="User Id" style={style.textInputStyle} onChangeText={(value)=>setUserId(value)}/>

                    <Text style={{fontWeight: 'bold', marginBottom:15}}>E - Mail</Text>
                    <TextInput placeholder="User Id" style={style.textInputStyle} onChangeText={(value)=>setEmail(value)}/>

                    <Text style={{fontWeight: 'bold', marginBottom:15}}>Password</Text>
                    <TextInput placeholder="Password" style={style.textInputStyle} secureTextEntry={true} onChangeText={(value)=>{setPassword(value)}}/>

                    <TouchableOpacity onPress={()=>validasi()}>
                      <View style={ style.buttonLoginStyle }>
                          <Text style={{fontWeight: 'bold'}}>Next</Text>
                      </View>
                    </TouchableOpacity>
                </View>
              </ScrollView>
          </Content>
          </ImageBackground>
        </Container>
      )
};

const style = StyleSheet.create({
    viewContent: {
      flex:1,
      flexDirection:"row", 
      height: height-(height*0.10)
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
