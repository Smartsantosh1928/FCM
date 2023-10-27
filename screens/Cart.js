import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header, Card, ListItem, Image, Button } from 'react-native-elements'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CounterInput from "react-native-counter-input";

const Cart = ({ navigation, route }) => {

    const [ orderedFoods, setOrderedFoods ] = useState([]);
    const [ userData, setUserData ] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('user').then((user) => {
            if(user){
                setUserData(JSON.parse(user));
            }
        })
        const orderedFoods = route.params.orderedFoods;
        const updatedFoods = orderedFoods.map((food) => {
            return {
                ...food,
                quantity:"1"
            }
        })
        console.log(updatedFoods);
        setOrderedFoods(updatedFoods);
    },[])

    const setQuantity = (quantity,id) => {
        const updatedFoods = orderedFoods.map((food) => {
            if(food.id === id){
                return {
                    ...food,
                    quantity
                }
            }
            return food;
        })
        setOrderedFoods(updatedFoods);
    }

    const placeOrder = () => {
        const foods = orderedFoods.reduce((result, obj) => {
            result[obj.id] = obj.quantity;
            return result;
          }, {});
        const data = {
            items: foods,
            userId: userData.uid,
            menuListId : route.params.menuListId,
            status: "Ordered",
            orderedAt: new Date(),
            paidAt: null
        }
        console.log(data);
        fetch('http://192.168.43.24:8080/orderItems/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Request failed with status ${response.status}`);
            }
        })
        .then((data) => {
            if(data.success){
                console.log(data.t);
                alert(data.msg)
                navigation.navigate('Orders')
            }
        })
        .catch((error) => {
            console.error(error);
        });

    }

  return (
    <View>
      <Header
        leftComponent={{ icon: 'home', size: 35, color: '#fff', onPress: () => navigation.navigate('FoodItems') }}
        centerComponent={{ text: 'Today Food Basket', style: { color: '#fff', height: 40, fontSize: 30 } }}
        containerStyle={{
            backgroundColor: '#3D6DCC',
        }}
      />
    {orderedFoods && <Card>
        <Card.Title>Today Basket</Card.Title>
        <Card.Divider/>
        {
        orderedFoods.map((u, i) => {
            return (
                <View key={i} style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                    <Image
                        style = {{ width: 100, height: 100 }}
                        resizeMode="center"
                        source={{ uri: u.imageUrl }}
                    />
                    <Text >{u.itemName} Price: {u.price}</Text>
                    {/* <TextInput keyboardType='numeric' onChangeText={(text) => setQuantity(text,u.id)} placeholder='Quantity' value={u.quantity} /> */}
                    <CounterInput style={{ width: 90, height: 30  }}
                        horizontal={true} initial={1} min={1}
                        onChange={(counter) => setQuantity(counter,u.id)}
                    />
                </View>
            );
        })
        }
        <Card.Divider style={{ marginTop: 30 }}/>
        <Text style={{marginBottom: 20}} >Total Price: {orderedFoods.reduce((acc,food) => acc + (food.price * food.quantity),0) || 0}</Text>
        <Button title='Place Order' onPress={placeOrder} />
    </Card>}
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})