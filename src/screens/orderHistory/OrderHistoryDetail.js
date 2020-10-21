import React from "react";
import { Image, Dimensions, ImageBackground, FlatList, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Container, Header, Title, Content, Footer, View, Text, Button } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';

import OrderDetail from '../../components/orderHistory/OrderDetail';

const {height, width} = Dimensions.get("window");

const OrderHistory = ({ navigation }) => {
    const DATA = [
    {
        kode_pemesanan: "TR001",
        kode_product: 'PR001',
        nama_product: 'Laptop',
        harga: 3000,
        qty:2
    },
    {
        kode_pemesanan: "TR001",
        kode_product: 'PR002',
        nama_product: 'Handphone',
        harga: 4000,
        qty:3
    }
    ];

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
                            <Text style={{fontSize:18, fontWeight: 'bold'}}>
                                ORDER DETAIL TR001 <IconFeather name="package" size={20}></IconFeather>
                            </Text>
                        </View>
                </View>
                
                <View style={ style.listTransaksi }>
                    <FlatList
                        data={DATA}
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