import React from "react";
import { Image, Dimensions, ImageBackground, FlatList, TextInput } from "react-native";
import { Container, Header, Title, Content, Footer, View, Text, Button, Item, Input  } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";

const CartRow = ({item, handlePlus, handleMinus}) => {
    console.log('wew');
    console.log('itemnya', item.qty);

    return (
        <View style={{flexDirection:"row", marginBottom:20, borderRadius:10, paddingVertical:30, backgroundColor:"white"}}>
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <Image source={ require('../../../assets/images/Product.png')} style={{height:40, width:40}} />
            </View>
            <View style={{flex:1, alignItems:"flex-start", justifyContent:"center"}}>
                <Text>{item.kode_product}</Text>
                <Text>{item.harga_jual}</Text>
            </View>
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <View style={{flexDirection:"column"}}>
                    <TouchableOpacity style={{marginBottom:5}} onPress={() => handlePlus(item.kode_product)}>
                        <IconFontAwesome name="plus" size={30}></IconFontAwesome>
                    </TouchableOpacity>
                    <Text>{item.qty}</Text>
                    {/* <TextInput 
                        style={{backgroundColor:"#F7F9FB", borderRadius:10, marginBottom:5}} 
                        keyboardType = 'numeric' 
                        value={item.qty.toString()}
                    /> */}
                    <TouchableOpacity onPress={() => handleMinus(item.kode_product)}>
                        <IconFontAwesome name="minus" size={30}></IconFontAwesome>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
      
}

export default CartRow;