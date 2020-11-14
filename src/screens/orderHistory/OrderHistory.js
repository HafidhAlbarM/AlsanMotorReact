import React, { useState, useEffect } from "react";
import { Image, Dimensions, ImageBackground, FlatList, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Container, Header, Title, Content, Footer, View, Text, Button } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import OrderList from '../../components/orderHistory/OrderList';

const {height, width} = Dimensions.get("window");

const OrderHistory = ({ navigation }) => {
    const [platNomor, setPlatNomor] = useState("");
    const [dataHistory, setDataHistory] = useState([]);

    useEffect(()=>{
        getDataUser();
    }, []);

    const getDataUser = async () => {
        try {
            let dataAsyncStorage = await AsyncStorage.getItem('@dataUser');
            dataAsyncStorage = dataAsyncStorage != null ? JSON.parse(dataAsyncStorage) : null;
            console.log(dataAsyncStorage[0]);
            setPlatNomor(dataAsyncStorage[0].plat_nomor);
            getDataOrder(dataAsyncStorage[0].plat_nomor);
        } catch(error) {
            console.log(error);
        }
      }

    const getDataOrder = (platNomor) => {
        axios.get(`http://localhost:3000/transaksi_pemesanan/${platNomor}`)
        .then(function (response) {
            // handle success
            setDataHistory(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    const renderItem = ({item}) => {
        return <OrderList item={item} navigation={navigation}/>
    }
      
    return(
        <Container>
          <View>
            <ImageBackground
                source={ require('../../../assets/images/background.jpg') }
                style={{width: '100%', height: '100%'}}
            >   
                <View style={ style.headerStyle }>
                        <View style={ style.backButton }>
                            <TouchableOpacity onPress={()=>navigation.goBack()}>
                                <Text>
                                    <IconIonicons name="ios-chevron-back-circle-outline" size={30}></IconIonicons>
                                </Text>
                            </TouchableOpacity>    
                        </View>
                        <View style={ style.title }>
                            <Text style={{fontSize:20, fontWeight: 'bold'}}>
                                ORDER HISTORY <IconFeather name="package" size={20}></IconFeather>
                            </Text>
                        </View>
                </View>
                
                <View style={ style.listTransaksi }>
                    <FlatList
                        data={dataHistory}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.kode_pemesanan}
                    />
                </View>
            </ImageBackground>
          </View>
        </Container>
    )
}

const style = StyleSheet.create({
        headerStyle: {
            flexDirection:"row", 
            height: 60, 
            marginHorizontal:20, 
            backgroundColor:"white", 
            borderRadius:20,
            justifyContent:"center",
            padding:20,
            marginTop:30
        },
        backButton:{
            flex:1, 
            alignItems:"flex-start", 
            justifyContent:"center"
        },
        title:{
            flex:10, 
            alignItems:"center", 
            justifyContent:"center"
        },
        listTransaksi:{
            flexDirection:"column", 
            marginHorizontal:20,
            marginTop: 20
        }
});

export default OrderHistory;