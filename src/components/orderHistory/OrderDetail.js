import React from "react";
import { Image, Dimensions, ImageBackground, FlatList, TextInput } from "react-native";
import { Container, Header, Title, Content, Footer, View, Text, Button  } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const OrderDetail = ({item}) => {
    return (
            <View style={{flexDirection:"row", marginBottom:20, borderRadius:10, paddingVertical:30, backgroundColor:"white"}}>
                <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Image source={ require('../../../assets/images/Product.png')} style={{height:50, width:50}} />
                </View>
                <View style={{flex:1, alignItems:"flex-start", justifyContent:"center"}}>
                    <Text>{item.kode_product}</Text>
                    <Text>{item.nama_product}</Text>
                    <Text>{item.harga}</Text>
                </View>
                <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <View style={{flexDirection:"column", backgroundColor:'#FFDA66', padding:20, borderRadius:50, height:50, justifyContent:"center"}}>
                    <Text>{item.qty}</Text>
                </View>
            </View>
            </View>
    );
      
}

export default OrderDetail;