import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodItems from './FoodItems';
import Payments from './Payments';
import Orders from './Orders';
import Profile from './Profile';
import Cart from './Cart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator initialRouteName='FoodItems'>
      <Tab.Screen name="FoodItems" component={FoodItems} options={{
          tabBarLabel: 'Foods',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cookie" color={color} size={size} />
          ),
          headerShown: false
        }}  />
      {/* <Tab.Screen name="Cart" component={Cart} options={{
        tabBarLabel: 'Cart',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          headerShown: false
        }} /> */}
      <Tab.Screen name="Payments" component={Payments} options={{
        tabBarLabel: 'Payments',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bank" color={color} size={size} />
            ),
          headerShown: false
        }} />
      <Tab.Screen name="Orders" component={Orders} options={{
        tabBarLabel: 'Orders',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          headerShown: false
        }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-tie" color={color} size={size} />
          ),
        headerShown: false
        }} />
    </Tab.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})