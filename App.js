import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect,useState } from 'react';
import Home from './screens/Home';
import Login from './screens/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cart from './screens/Cart';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='Home' component={Home} options={{ headerShown:false }} />
      <InsideStack.Screen name='Cart' component={Cart} options={{ headerShown:false }} />
    </InsideStack.Navigator>
  )
}

export default function App() {

  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const getData = async () => {
      await AsyncStorage.getItem('user').then((user) => {
        if(user){
          setUser(JSON.parse(user))
          console.log(JSON.parse(user));
        }
      })
    }
    getData()
    onAuthStateChanged(FIREBASE_AUTH,async (user) => {
      await AsyncStorage.setItem('user',JSON.stringify(user))
      setUser(user)
    })
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown:false }} /> : <Stack.Screen name="Login" component={Login} options={{ headerShown:false }} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
