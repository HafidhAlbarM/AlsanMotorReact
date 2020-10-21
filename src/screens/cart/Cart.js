import React, { useState } from "react";
import { Image, Dimensions, ImageBackground, FlatList, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Container, Header, Title, Content, Footer, View, Text, Button } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import CartRow from '../../components/cart/CartRow';

const {height, width} = Dimensions.get("window");

const Cart = ({ navigation }) => {
    const DATA = navigation.state.params.dataCart;

    const renderItem = ({item}) => {
        return <CartRow item={item}/>
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
                            <TouchableOpacity onPress={()=>navigation.navigate("ProductListScreen")}>
                                <Text>
                                    <IconIonicons name="ios-chevron-back-circle-outline" size={30}></IconIonicons>
                                </Text>
                            </TouchableOpacity>    
                        </View>
                        <View style={ style.title }>
                            <Text style={{fontSize:20, fontWeight: 'bold'}}>
                                CART <IconFontAwesome name="shopping-cart" size={30}></IconFontAwesome>
                            </Text>
                        </View>
                        <View style={ style.backButton }></View>
                </View>
                
                <View style={ style.listProduct }>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.Kode_Product}
                    />
                </View>

                <View style={ style.sumary }>
                    <Text style={{fontWeight: 'bold'}}>Total Qty: 4</Text>
                    <Text style={{fontWeight: 'bold'}}>Total Amount: Rp. 28000</Text>
                </View>

                <TouchableOpacity>
                    <View style={ style.placeToOrderStyle }>
                        <Text style={{fontWeight: 'bold'}}>Place Your Order</Text>
                    </View>
                </TouchableOpacity>
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
            flex:2, 
            alignItems:"center", 
            justifyContent:"center"
        },
        listProduct:{
            flexDirection:"column", 
            marginHorizontal:20,
            marginTop: 20
        },
        sumary:{
            marginHorizontal:20, 
            backgroundColor:"white", 
            borderRadius:20,
            padding:20,
            marginBottom:20
        },
        placeToOrderStyle: {
            flexDirection:"row", 
            height: 60, 
            marginHorizontal:20, 
            backgroundColor:"#f5c542", 
            borderRadius:20,
            justifyContent:"center",
            padding:20,
        }
});

export default Cart;