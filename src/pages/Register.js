import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import RegisterForm from '../components/RegisterForm';
import {Actions} from 'react-native-router-flux';

export default class Register extends Component {

   render(){
      return(
         <View style={styles.container}>
            <View style={styles.form}>
               {/* <Text style={styles.title}>Sup<Text style={styles.title2}>File</Text></Text> */}
               <RegisterForm type="Register"/>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container:{
      //paddingVertical:20,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center',
      flex:1
   },
   form:{
      justifyContent:'center',
      alignItems:'center',
   },
   title:{
      justifyContent:'center',
      fontSize:45,
      color:'black',
      fontWeight:'bold',
      marginVertical:50
   },
   title2:{
      color:'#EF6C00'
   },
   registerText:{
      //alignItems:'flex-end',
      //justifyContent:'center',
      flexDirection:'row',
      paddingVertical:15,
   },
   registerButton:{
      color:'black',
      //flex:1
   }
});
