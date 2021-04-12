import React, {useContext, useState} from 'react';
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
  } from 'react-native'
  import AuthContext from './context/AuthContext';
  
  const SignUp = () => {
    const status = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState({});

    const signUpAction = () => {
      const newUser = {
        name: name,
        email: email,
        password: password,
        password2: password2
      };
      console.log(newUser);
      axios
        .post("/api/users/register", newUser)
        .then(res => status.setCurrentAuthScreen("SignIn")) 
        .catch(err => alert(err));
    }
  
    return (
    <View style={styles.container}>
      <View style={{
          borderColor:"#ddd",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor:"#121640"
        }}>
          {/* #b7ede2 */}
        <Image
          style={{width: 500, height: 225, marginBottom: 20}}
          source={{
            uri: "https://i.ibb.co/4jwZbFD/musme-logo.png"
          }}
        />
        <View style={styles.action}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#00"
            style={[styles.textInput, {color: "#00c4cc", outline: 'none'}]}
            autoCapitalize="none"
            onChangeText = {(val) => setName(val)}
            value = {name}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#00"
            style={[styles.textInput, {color: "#00c4cc", outline: 'none'}]}
            autoCapitalize="none"
            onChangeText = {(val) => setEmail(val)}
            value = {email}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#00"
            secureTextEntry="true"
            style={[styles.textInput, {color: "#00c4cc", outline: 'none'}]}
            autoCapitalize="none"
            onChangeText = {(val) => setPassword(val)}
            value = {password}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#00"
            secureTextEntry="true"
            style={[styles.textInput, {color: "#00c4cc", outline: 'none'}]}
            autoCapitalize="none"
            onChangeText = {(val) => setPassword2(val)}
            value = {password2}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => signUpAction()}
          >
            <Text style={styles.signUpBtnText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={()=>{status.setCurrentAuthScreen('SignIn')}}>
            <Text style={styles.button2}>Already have an account? <Text style={styles.button2}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    // engine: {
    //   position: 'absolute',
    //   right: 0,
    // },
    // sectionContainer: {
    //   marginTop: 32,
    //   paddingHorizontal: 24,
    // },
    // sectionTitle: {
    //   fontSize: 24,
    //   fontWeight: '600',
    // },
    // sectionDescription: {
    //   marginTop: 8,
    //   fontSize: 18,
    //   fontWeight: '400',
    // },
    // highlight: {
    //   fontWeight: '700',
    // },
    // footer: {
    //   fontSize: 12,
    //   fontWeight: '600',
    //   padding: 4,
    //   paddingRight: 12,
    //   textAlign: 'right',
    // },
    signUpBtn:{
      backgroundColor:"#00c4cc",
      marginTop: 10,
      marginLeft:30,
      marginRight:30,
      marginBottom: 30,
      padding: 10,
      borderRadius:10,
      borderWidth: 1,
    },
    signUpBtnText:{
      color:"#121640",
      textAlign:"center",
      fontSize:18,
    },
    signUpBtnDisabled:{
      opacity: 0.6
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#00c4cc'
    },
    button: {
        color:"#000",
        marginTop: 10,
        padding: 20 ,
    },
    button2: {
      color:"#a6297d",
      textAlign:'center',
      fontSize: 18,
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#00c4cc',
      paddingBottom: 10, 
      marginBottom: 12,
      marginLeft:20,
      marginRight:20,
    },
    textInput: {
      flex: 1,
      // marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      fontSize:20,
      color: '#00c4cc',
    },
    title:{
      marginBottom:15,
      color: '#000',
      fontSize: 27,
      fontWeight: 'bold',
      textAlign: 'center'
    },
  });

export default SignUp;