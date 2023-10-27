import { View, Text, Button,StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'

export const Login = () => {

  const [ email, setEmail ] = useState("")
  const [ pass, setPass ] = useState("")
  const [ page, setPage ] = useState("login")
  const [ loading, setLoading ] = useState(false)

  const auth = FIREBASE_AUTH

  const signIn = async () => {
    setLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth,email,pass)
    } catch (error) {
      console.log(error);
      alert("Sign In Failed"+error)
    }
    setLoading(false)
  }

  const signUp = async () => {
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth,email,pass)
      // console.log(res);
      alert("Registration Successfull\nCheck your email for verification")
    } catch (error) {
      console.log(error);
      alert("Registration Failed"+error)
    }
    setLoading(false)
  }

  return (
    <View style={style.container}>
      <KeyboardAvoidingView behavior='padding'>
        {page === "register" ? <Text style={style.text} >Create Your new Account</Text> : <Text style={style.text}>Sign in with Credentials</Text>}
        <TextInput style={style.input} autoCapitalize='none' onChangeText={(text) => setEmail(text)} placeholder='Email' value={email} />
        <TextInput secureTextEntry={true} style={style.input} autoCapitalize='none' onChangeText={(text) => setPass(text)} placeholder='Password' value={pass} />
        {loading ? <ActivityIndicator size={'large'} color='#0000ff' /> : 
        <>
        { page==="register" ? <><Button onPress={signUp} title='Register' />
        <Text style={style.text}>Already have a account? <Text style={style.smallText} onPress={() => setPage("login")}>Login</Text></Text></>
         : <><Button onPress={signIn} title='Log In' />
        <Text style={style.text}>Don't have a account? <Text style={style.smallText} onPress={() => setPage("register")}>SignUp</Text></Text></>}
        </>}
      </KeyboardAvoidingView>
    </View>
  )
}

export default Login

const style = StyleSheet.create({
  smallText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
    color: "#4285F4"
  },
  container : {
    marginHorizontal: 20,
    flex: 1,
    justifyContent : "center"
  },
  input : {
    marginVertical: 4,
    marginBottom: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#fff"
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,    
  }
})