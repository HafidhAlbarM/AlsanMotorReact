import React, { useEffect, useState } from "react";
import { Image, Dimensions, ImageBackground, StyleSheet } from "react-native";
import { Container, Header, Content, View, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from "react-native-gesture-handler";

const {height, width} = Dimensions.get("window");

const Profile = ({ navigation }) => {
      const [pemilik, setPemilik] = useState("");
      const [alamat, setAlamat] = useState("");
      const [merk_mobil, setMerkMobil] = useState("");
      const [nama_mobil, setNamaMobil] = useState("");
      const [plat_nomor, setPlatNomor] = useState("");
      const [email, setEmail] = useState("");
      const [jumlah_cuci, setJumlahCuci] = useState(0);

      useEffect(()=>{
        getDataUser();
      }, []);

      const getDataUser = async () => {
        try {
            let dataAsyncStorage = await AsyncStorage.getItem('@dataUser');
            dataAsyncStorage = dataAsyncStorage != null ? JSON.parse(dataAsyncStorage) : null;
            console.log(dataAsyncStorage[0]);
            setPemilik(dataAsyncStorage[0].pemilik);
            setAlamat(dataAsyncStorage[0].alamat);
            setMerkMobil(dataAsyncStorage[0].merk_mobil);
            setNamaMobil(dataAsyncStorage[0].nama_mobil);
            setPlatNomor(dataAsyncStorage[0].plat_nomor);
            setEmail(dataAsyncStorage[0].email);
            setJumlahCuci(dataAsyncStorage[0].jumlah_cuci);
            return dataAsyncStorage;
        } catch(error) {
            console.log(error);
        }
      }

      return (
        <Container>
          <Header style={ style.headerStyle }>
              <View style={{paddingVertical:40}}>
                <Image source={require('../../../assets/images/profile.png')} style={{height:130, width:130}} />
                <Text style={{fontWeight:"bold", alignSelf:"center"}}>{pemilik}</Text>
              </View>
          </Header>
          <ImageBackground
          source={ require('../../../assets/images/background.jpg') }
          style={{width: '100%', height: '100%'}}
          > 
          <Content>
              <View style={ style.viewContent }>
                  <View style={{backgroundColor:"#F7F9FB", flex:1, margin:40, borderRadius:30, paddingHorizontal:10, paddingVertical:30}}>
                    <View style={{flexDirection:"row"}}>
                      <View style={{flex:1, marginHorizontal:10}}>
                        <Text style={{fontWeight:"bold", marginBottom:20}}>Car :</Text>
                      </View>
                      <View style={{flex:2}}>
                        <Text style={{fontWeight:"bold", marginBottom:20}}>{`${merk_mobil} ${nama_mobil}`}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <View style={{flex:1, marginHorizontal:10}}>
                        <Text style={{fontWeight:"bold", marginBottom:20}}>Plate Number :</Text>
                      </View>
                      <View style={{flex:2}}>
                        <Text style={{fontWeight:"bold", marginBottom:20}}>{plat_nomor}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <View style={{flex:1, marginHorizontal:10}}>
                        <Text style={{fontWeight:"bold", marginBottom:20}}>E-Mail :</Text>
                      </View>
                      <View style={{flex:2}}>
                        <Text style={{fontWeight:"bold", marginBottom:20}}>{email}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <View style={{flex:1, marginHorizontal:10}}>
                        <Text style={{fontWeight:"bold", marginBottom:20}}>Address :</Text>
                      </View>
                      <View style={{flex:2}}>
                        <Text style={{fontWeight:"bold", marginBottom:20}}>{alamat}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <View style={{flex:1, marginHorizontal:10}}>
                        <Text style={{fontWeight:"bold", marginBottom:20}}>Total Wash :</Text>
                      </View>
                      <View style={{flex:2}}>
                        <Text style={{fontWeight:"bold", marginBottom:20}}>{jumlah_cuci}</Text>
                      </View>
                    </View >
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate("OrderHistoryScreen")}>
                        <Text style={style.btnLogStyle}>Order History</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>
          </Content>
          </ImageBackground>
        </Container>
      )
};

const style = StyleSheet.create({
    headerStyle: {
      height: height*0.30, 
      width: width, 
      backgroundColor: "transparent", 
      elevation: 0
    },
    viewContent: {
      flexDirection: "row", 
      height: height-(height*0.30)
    },
    btnLogStyle:{
        alignSelf:"center",
        flexDirection:"row", 
        height: 40, 
        marginHorizontal:20, 
        backgroundColor:"#f5c542", 
        borderRadius:20,
        justifyContent:"center",
        padding:10,
    }
});

export default Profile;
