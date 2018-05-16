import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import LoginForm from '../components/LoginForm';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {

   render(){
      return(
         <View style={styles.container}>
            <View style={styles.form}>
               <Text style={styles.title}>Sup<Text style={styles.title2}>File</Text></Text>
               <LoginForm type="Login"/>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container:{
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center',
      flex:1
   },
   form:{
      //justifyContent:'center',
      alignItems:'center',
   },
   title:{
      fontSize:45,
      color:'black',
      fontWeight:'bold',
      marginVertical:50
   },
   title2:{
      color:'#EF6C00'
   },
   loginText:{
      alignItems:'flex-end',
      justifyContent:'center',
      flexDirection:'row',
      paddingVertical:15,
   },
   loginButton:{
      color:'black'
   }
});
