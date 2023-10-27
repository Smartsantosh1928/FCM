import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Header } from 'react-native-elements'

export const Payments = ({ navigation }) => {
  return (
    <View>
      <Header
        leftComponent={{ icon: 'home', size: 35, color: '#fff', onPress: () => navigation.navigate('FoodItems') }}
        centerComponent={{ text: 'Payments', style: { color: '#fff', height: 40, fontSize: 30 } }}
        containerStyle={{
        backgroundColor: '#3D6DCC',
        }}
      />
      <Text>Payments</Text>
    </View>
  )
}

export default Payments

const styles = StyleSheet.create({})