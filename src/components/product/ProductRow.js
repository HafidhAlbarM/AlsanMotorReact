import React from "react";
import { Image } from "react-native";
import { View, Text } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";
import { currencyFormat } from "../../function";

const ProductRow = ({item, addToCart}) => {
    return (
        <View style={{flexDirection:"row", marginBottom:20, borderRadius:10, padding:10, backgroundColor:"white"}}>
            <View style={{flex:1, alignItems:"center"}}>
                <Image source={ require('../../../assets/images/Product.png')} style={{height:40, width:40}} />
            </View>
            <View style={{flex:1, alignItems:"flex-start"}}>
                <Text>{item.Nama_Product}</Text>
                <Text>{currencyFormat(item.Harga_Jual)}</Text>
            </View>
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <TouchableOpacity onPress={()=>addToCart(item.Kode_Product, item.Harga_Jual)}>
                    <IconFontAwesome name="plus" size={30}></IconFontAwesome>
                </TouchableOpacity>
            </View>
        </View>
    );
      
}

export default ProductRow;