import React, { useState, useEffect } from "react";
import { Dimensions, ImageBackground, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Container, View, Text } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

import ProductRow from '../../components/product/ProductRow';

const {height, width} = Dimensions.get("window");

const ProductList = ({ navigation }) => {
    const [dataProduct, setDataProduct] = useState([]);

    const [dataCart, setDataCart] = useState([]);

    const [jumlahItemCart, setJumlahItemCart] = useState(0);

    useEffect(()=>{
        getDataProduct();
    }, []);

    const getDataProduct = () => {
        axios.get(`${API_URL}product`)
        .then(function (response) {
            // handle success
            setDataProduct(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    const addToCart = async (kode_product, harga_jual)=>{
       
        const dataFilter = dataCart.filter(
            dataCart => dataCart.kode_product == kode_product
        )

        if(dataFilter.length==0){
            await dataCart.push({
                kode_product: kode_product,
                harga_jual: harga_jual,
                qty: 1,
                sub_total: harga_jual
            });
        }else{
            dataFilter[0].qty = await dataFilter[0].qty + 1;
            dataFilter[0].sub_total = await (dataFilter[0].qty + 1) * dataFilter[0].sub_total;
        }
        setJumlahItemCart(dataCart.length);
    }

    const renderItem = ({item}) => {
        return <ProductRow item={item} addToCart={addToCart}/>
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
                            <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")}>
                                <Text>
                                    <IconIonicons name="ios-chevron-back-circle-outline" size={30}></IconIonicons>
                                </Text>
                            </TouchableOpacity>    
                        </View>
                        <View style={ style.cartButton }>
                            <TouchableOpacity onPress={()=>navigation.navigate("CartScreen", {dataCart: dataCart})}>
                                <Text>
                                    <IconFontAwesome name="shopping-cart" size={30}></IconFontAwesome>
                                    <Text>{jumlahItemCart}</Text>
                                </Text>
                            </TouchableOpacity>    
                        </View>
                    
                </View>
                
                <View style={ style.listProduct }>
                    <View style={ style.listProductTitle }>
                            <View style={{flex:1, alignItems:"center"}}>
                                <Text style={{fontSize:20, fontWeight: 'bold'}}>PRODUCT LIST</Text>
                            </View>
                    </View>

                    <FlatList
                        data={dataProduct}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
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
        cartButton:{
            flex:1, 
            alignItems:"flex-end", 
            justifyContent:"center"
        },
        listProduct:{
            flexDirection:"column", 
            // height: height-40, jgn pake height, pake flex aja biar tingginya dinamis
            flex:1,
            padding:30, 
            margin:20, 
            backgroundColor:"white", 
            borderRadius:50,
            backgroundColor:"#F7F9FB"
        },
        listProductTitle:{
            flexDirection:"row", 
            backgroundColor:"white", 
            borderWidth:0, 
            marginBottom:5,
            backgroundColor:"#F7F9FB"
        }
});

export default ProductList;