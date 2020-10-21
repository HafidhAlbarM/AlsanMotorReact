import React from "react";
import { Image, Dimensions, ImageBackground, FlatList, TextInput } from "react-native";
import { Container, Header, Title, Content, Footer, View, Text, Button, Item  } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";

const CartRow = ({item}) => {
    return (
        <View style={{flexDirection:"row", marginBottom:20, borderRadius:10, paddingVertical:30, backgroundColor:"white"}}>
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <Image source={ require('../../../assets/images/Product.png')} style={{height:40, width:40}} />
            </View>
            <View style={{flex:1, alignItems:"flex-start", justifyContent:"center"}}>
                <Text>{item.Kode_Product}</Text>
                <Text></Text>
            </View>
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <View style={{flexDirection:"column"}}>
                    <TouchableOpacity style={{marginBottom:5}}>
                        <IconFontAwesome name="plus" size={30}></IconFontAwesome>
                    </TouchableOpacity>
                    <TextInput 
                        style={{backgroundColor:"#F7F9FB", borderRadius:10, marginBottom:5}} 
                        keyboardType = 'numeric' 
                        // value={qty.toString()}
                        // onChangeText = {(value)=>setQty(value)}
                    />
                    <TouchableOpacity>
                        <IconFontAwesome name="minus" size={30}></IconFontAwesome>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
      
}

export default CartRow;