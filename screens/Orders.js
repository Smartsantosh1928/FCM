import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header, Card, ListItem, Image, Button } from 'react-native-elements'
import { WebView } from 'react-native-webview'

const Orders = ({ navigation }) => {

  const [orderItems, setOrderItems] = useState([])
  const [ orderId, setOrderId ] = useState('')

  useEffect(() => {
    fetch("http://192.168.43.24:8080/orderItems/all")
    .then((res) => res.json())
    .then((data) => {
      setOrderItems(data)
    })
    .catch((err) => {
      console.log(err)
    })
    fetch('http://192.168.43.24:8080/payment/createOrderId/100', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    }).then((res) => res.text())
    .then((data) => {
      console.log(data);
      setOrderId(data)
    })
  },[])

  return (
        <WebView
        source={{ uri: 'https://filebin.net/rizh2c8c5oimnuwg/index.html' }} // Local HTML file path
        onMessage={(event) => {
          if (event.nativeEvent.data === 'success') {
            alert("Payment Successfull")
          } else if (event.nativeEvent.data === 'failure') {
            alert("Payment Failed")
          }
        }}
      />
  )
}

export default Orders

const styles = StyleSheet.create({

})