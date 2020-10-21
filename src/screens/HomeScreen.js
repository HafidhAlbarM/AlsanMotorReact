import React from "react";
import { Image, Dimensions, ImageBackground, StyleSheet } from "react-native";
import { Container, Header, Title, Content, Footer, View, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from "react-native-gesture-handler";

const {height, width} = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
      return (
        <Container>
          <Header style={ style.headerStyle }>
              <View style={ style.headerDivision }>
                  <Image source={require('../../assets/images/logo_alsan_2.png')} style={{height:30, width:160}} />
                  <Text style={{fontWeight: 'bold'}}>Store</Text>
                  <Text style={{fontStyle: 'italic', fontSize:10,}}>Stay home, stay safe</Text>
              </View> 
              <View style={ style.headerDivision }>
                <Image source={require('../../assets/images/logo_alsan.png')} style={{height:160, width:160}} />
              </View>
          </Header>
          <ImageBackground
          source={ require('../../assets/images/background.jpg') }
          style={{width: '100%', height: '100%'}}
        > 
          <Content>
              <View style={ style.viewContent }>
                <View style={ style.viewContentMenu }>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('ProductListScreen')} 
                    style={ style.cartButton }
                  >
                    <Text><Icon name="shopping-cart" type="Entypo" size={70}/></Text>
                  </TouchableOpacity>
                </View>
                <View style={ style.viewContentMenu }>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('ProfileScreen')} 
                    style={ style.profileButton }>
                    <Text><Icon name="user" type="FontAwesome" size={70}/></Text>
                  </TouchableOpacity>
                </View>
              </View>
          </Content>
          </ImageBackground>
        </Container>
      )
};

const style = StyleSheet.create({
    headerStyle: {
      height:height*0.30, 
      width:width, 
      backgroundColor:"transparent", 
      elevation: 0
    },
    headerDivision: {
      flex:1, 
      justifyContent:"center"
    },
    viewContent: {
      flexDirection:"row", 
      height: height-(height*0.30)
    },
    viewContentMenu: {
      flex:1, 
      justifyContent:"center"
    },
    cartButton: {
      alignSelf:"center", 
      backgroundColor:"#1f5ec4", 
      padding:30, 
      borderRadius:10
    },
    profileButton: {
      alignSelf:"center", 
      backgroundColor:"red", 
      padding:30, 
      borderRadius:10
    }
});

export default HomeScreen;
