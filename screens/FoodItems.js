import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Button, Icon, Header } from 'react-native-elements'
import Ficon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from "expo-file-system"

export const FoodItems = ({ navigation }) => {

  const [ data, setData ] = useState([]);
  const [ foodItems, setFoodItems ] = useState([]);
  const [ orderedFoods, setOrderedFoods ] = useState([]);

  const saveImageToFileSystem = async (id) => {
    try {
      const response = await axios.get(`http://192.168.43.24:8080/file/download/${id}`, {
        responseType: 'blob',
      });
  
      if (response.status === 200) {
        const blob = response.data;
        const fileName = `${id}.jpg`; 
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;
        const reader = new FileReader();

        reader.onload = async () => {
          const base64Blob = reader.result.split(',')[1];
          await FileSystem.writeAsStringAsync(fileUri, base64Blob, { encoding: FileSystem.EncodingType.Base64 });
        };

        reader.readAsDataURL(blob);

        return fileUri;
      } else {
        throw new Error('Failed to fetch image');
      }
    } catch (err) {
      console.error(err);
      return '';
    }
  };
  
  const retrieveImage = async (id) => {
    const localFileUri = await saveImageToFileSystem(id);
    
    if (localFileUri) {
      const objectURL = localFileUri;
      return objectURL;
    }
  
    return '';
  };
   

  useEffect(() =>{
    axios.get('http://192.168.43.24:8080/menuList/get-today-menu')
    .then(async (res) => {
      setData(res.data.t);
      console.log(res.data.t.id);
      const foodItemsWithImages = await Promise.all(
        res.data.t.foodItems.map(async (foodItem) => {
          const imageUrl = await retrieveImage(foodItem.imageId);
          return { ...foodItem, imageUrl };
        })
      )
      setFoodItems(foodItemsWithImages);
    })
    .catch(err => console.log(err));
  },[])

  const renderItem = ({ item }) => (
    <Card key={item.id}>
      <Card.Title style={{ color: 'green', fontSize: 20 }}>{item.itemName}</Card.Title>
      <Card.Divider />
      <Card.Image source={{ uri: item.imageUrl }} />
      <Text style={{ marginBottom: 10, textAlign: 'center' }}>Food Category: {item.category}</Text>
      <Text style={{ marginBottom: 10, textAlign: 'center' }}>
        Food Price: <Ficon name='rupee' color='blue' /> {item.price}
      </Text>
      <Button
        icon={<Icon name='library-add' color='#ffffff' />}
        buttonStyle={{ padding: 10, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='Add to Dish'
        titleStyle={{ padding: 6 }}
        onPress={() => {
          if(orderedFoods.includes(item)) {
            alert('Already Added');
            return;
          }else{
            setOrderedFoods([...orderedFoods, item]);
          }
        }}
      />
    </Card>
  );


  return (
    <View>
      <Header
        leftComponent={{ icon: 'home', size: 35, color: '#fff', onPress: () => navigation.navigate('FoodItems') }}
        centerComponent={{ text: 'Food Items', style: { color: '#fff', height: 40, fontSize: 30 } }}
        containerStyle={{
        backgroundColor: '#3D6DCC',
        }}
      />
      <FlatList
        data={[...foodItems]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        icon={<Icon name='library-add' color='#ffffff' />}
        buttonStyle={{ padding: 10, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='Go to Cart'
        titleStyle={{ padding: 6 }}
        onPress={() => {
          orderedFoods.length === 0 ? alert('Please add some food to cart') : navigation.navigate('Cart', { orderedFoods, menuListId : data.id })
          setOrderedFoods([]);
        }}
        
      />
    </View>
  )
}

export default FoodItems

const styles = StyleSheet.create({})