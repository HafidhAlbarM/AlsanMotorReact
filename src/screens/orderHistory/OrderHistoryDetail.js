import React, {useState, useEffect} from "react";
import { Image, Dimensions, ImageBackground, FlatList, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Container, Header, Title, Content, Footer, View, Text, Button } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

import OrderDetail from '../../components/orderHistory/OrderDetail';

const {height, width} = Dimensions.get("window");

const OrderHistory = ({ navigation }) => {
    const kodePemesanan = navigation.state.params.kodePemesanan;
    const [dataOrderDetail, setDataOrderDetail] = useState([]);

    useEffect(()=>{
        getDataOrderDetail()
    }, []);

    const getDataOrderDetail = () => {
        axios.get(`${API_URL}transaksi_pemesanan/get_detail/${kodePemesanan}`)
        .then(function (response) {
            setDataOrderDetail(response.data.data)
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
        return <OrderDetail item={item}/>
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
                            <TouchableOpacity onPress={()=>navigation.navigate("OrderHistoryScreen")}>
                                <Text>
                                    <IconIonicons name="ios-chevron-back-circle-outline" size={30}></IconIonicons>
                                </Text>
                            </TouchableOpacity>    
                        </View>
                        <View style={ style.title }>
                            <Text style={{fontSize:15, fontWeight: 'bold'}}>
                                ORDER DETAIL {kodePemesanan} <IconFeather name="package" size={20}></IconFeather>
                            </Text>
                        </View>
                </View>
                
                <View style={ style.listTransaksi }>
                    <FlatList
                        data={dataOrderDetail}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.kode_product}
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