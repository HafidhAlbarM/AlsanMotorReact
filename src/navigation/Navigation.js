import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from "../screens/HomeScreen";
import ProductList from "../screens/product/ProductListScreen";
import Cart from "../screens/cart/Cart";
import Profile from "../screens/profile/Profile";
import OrderHistory from "../screens/orderHistory/OrderHistory";
import OrderHistoryDetail from "../screens/orderHistory/OrderHistoryDetail";
import Login from "../screens/login/Login";
import Registration1 from "../screens/login/Registration1";
import Registration2 from "../screens/login/Registration2";

const navigation = createStackNavigator(
  {
    LoginScreen: Login,
    Registration1Screen: Registration1,
    Registration2Screen: Registration2,
    HomeScreen: HomeScreen,
    ProductListScreen: ProductList,
    CartScreen: Cart,
    ProfileScreen: Profile,
    OrderHistoryScreen: OrderHistory,
    OrderHistoryDetailScreen: OrderHistoryDetail
  },
  {
    initialRouteName: "LoginScreen",
    headerMode:"none"
  }
);

export default createAppContainer(navigation);
