import React from "react";
import { Image, Dimensions, ImageBackground, FlatList, TextInput } from "react-native";
import { Container, Header, Title, Content, Footer, View, Text, Button  } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from "react-native-gesture-handler";

const OrderList = ({item, navigation}) => {
    return (
        <TouchableOpacity onPress={ () =>navigation.navigate("OrderHistoryDetailScreen") }>
            <View style={{flexDirection:"row", marginBottom:20, borderRadius:10, paddingVertical:30, backgroundColor:"white"}}>
                <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Image source={ require('../../../assets/images/Transaction.png')} style={{height:50, width:50}} />
                </View>
                <View style={{flex:1, alignItems:"flex-start", justifyContent:"center"}}>
                    <Text>{item.kode_pemesanan}</Text>
                    <Text>{item.tanggal_pemesanan}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
      
}

export default OrderList;