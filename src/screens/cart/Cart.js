import React, { useEffect, useState } from "react";
import { Image, Dimensions, ImageBackground, FlatList, ScrollView, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import { Container, Header, Title, Content, Footer, View, Text, Button } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { currencyFormat, currentDate } from "../../function";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

import CartRow from '../../components/cart/CartRow';

const {height, width} = Dimensions.get("window");

const Cart = ({ navigation }) => {
    const [kodeKaryawan, setKodeKaryawan] = useState("");
    const [platNomor, setPlatNomor] = useState("");
    const [email, setEmail] = useState("");
    const [tanggalPemesanan, setTanggalPemesanan] = useState("");
    const [totalQty, setTotalQty] = useState(0);
    let [total, setTotal] = useState(0);
    const [status, setStatus] = useState("");
    const [dataCart, setDataCart] = useState([]);

    useEffect(()=>{
        getDataUser();
        setCart();
      }, []);

    const getDataUser = async () => {
        try {
            let dataAsyncStorage = await AsyncStorage.getItem('@dataUser');
            dataAsyncStorage = dataAsyncStorage != null ? JSON.parse(dataAsyncStorage) : null;
            setKodeKaryawan('admin');
            setPlatNomor(dataAsyncStorage[0].plat_nomor);
            setEmail(dataAsyncStorage[0].email);
            setTanggalPemesanan(currentDate());
            setStatus('BELUM LUNAS');
        } catch (error){
            console.log(error);
        }
    }

    const handlePlus = (kode_product) => {
        let dataItem = dataCart;

        const dataFilter = dataItem.filter(
            dataCart => dataCart.kode_product == kode_product
        );

        dataFilter[0].qty = dataFilter[0].qty + 1;
        dataFilter[0].sub_total = dataFilter[0].harga_jual * dataFilter[0].qty;

        setTotal(total + dataFilter[0].harga_jual);
        setTotalQty(totalQty + 1);
        
        setDataCart(dataItem);
    }

    const handleMinus = (kode_product) => {
        let dataItem = dataCart;

        const dataFilter = dataItem.filter(
            dataCart => dataCart.kode_product == kode_product
        );

        dataFilter[0].qty = dataFilter[0].qty - 1;
        dataFilter[0].sub_total = dataFilter[0].harga_jual * dataFilter[0].qty;

        setTotal(total - dataFilter[0].harga_jual);
        setTotalQty(totalQty - 1);
        
        setDataCart(dataItem);
    }

    const setCart = async ()  => {
        let dataParam = await navigation.state.params.dataCart;
        
        setDataCart(dataParam);

        let qty=0;
        let totalQty=0;
        await dataParam.forEach(function(data){
            qty = qty + data.qty;
            totalQty = totalQty + (data.harga_jual * data.qty)
        });

        setTotalQty(qty);
        setTotal(totalQty);
    }

    const handleSubmit = () => {
        const transaksi_pemesanan_detail = [];

        dataCart.forEach(function(data){
            transaksi_pemesanan_detail.push({
                "kode_product": data.kode_product,
                "harga": data.harga_jual,
                "qty": data.qty,
                "sub_total":data.sub_total
            });
        });

        if(transaksi_pemesanan_detail.length != 0){
            const dataInsert = {
                kode_karyawan: kodeKaryawan,
                email: email,
                plat_nomor: platNomor,
                tanggal_pemesanan: tanggalPemesanan,
                total_qty: totalQty,
                total: total,
                status: status,
                transaksi_pemesanan_detail: transaksi_pemesanan_detail
            }
            console.log(`${API_URL}transaksi_pemesanan`);
            
            axios.post(`${API_URL}transaksi_pemesanan`, dataInsert)
            .then(res => {
                if(res.data.success){
                    navigation.navigate("HomeScreen");
                    
                    ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
                }else{
                    ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
                }
                
            }).catch(err => console.log(err));
        }
    }

    const renderItem = ({item}) => {
        return <CartRow item={item} handlePlus={handlePlus} handleMinus={handleMinus}/>
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
                        data={dataCart}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.kode_product}
                    />
                </View>

                <View style={ style.sumary }>
                    <Text style={{fontWeight: 'bold'}}>Total Qty: {totalQty}</Text>
                    <Text style={{fontWeight: 'bold'}}>Total Amount: {currencyFormat(total)}</Text>
                </View>

                <TouchableOpacity onPress={() => handleSubmit()}>
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