import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  List,
  AsyncStorage
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Login from './Login';

export default class Profile extends Component {
   constructor(props){
      super(props);
      this.state={
         dataSource:''
      };
   }

   componentWillMount(){
      this.props.navigation.setParams({
         'onRight' : this.editButton
      });
      this.getCurrentUser();
   }

   getCurrentUser(){
      AsyncStorage.getItem('id_token').then((token)=>{
         //console.error(token)
         fetch('http://api.supfile.org/user/',{
            method:'GET',
            headers:{
               'Authorization': token,
            }
         })
         .then((response) => {
            return response.json();
         })
         .then((responseJson) => {
            //console.error(responseJson)
            this.setState({
               dataSource:responseJson
            });
         })
         .catch((error) => {
            console.error(error);
         });
      });
   }

   login(){
      Actions.login()
   }

   logout(){
      AsyncStorage.removeItem('id_token');
      this.login();
   }

   editButton(){
      Alert.alert('Modifier')
   }

   render(){
      return(
         <View style={styles.container}>
            <Text style={styles.user}>Email : {this.state.dataSource.email}</Text>
            <Text style={styles.user}>Password : {this.state.dataSource.password}</Text>
            <View style={styles.button}>
               <TouchableOpacity onPress={this.logout.bind(this)} style={styles.logout}>
                  <Text style={styles.logoutText}>Se déconnecter</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      backgroundColor:'white',
   },
   button:{
      justifyContent:'center',
      alignItems:'center'
   },
   user:{
      fontSize:17,
      marginLeft:20,
      marginTop:10

   },
   logout:{
      alignItems:'center',
      width:300,
      backgroundColor:'white',
      paddingHorizontal:15,
      paddingVertical:10,
      marginVertical:5,
      borderRadius:25,
      borderWidth:3,
      borderColor:'#EF6C00',
      marginVertical:30
   },
   logoutText:{
      color:'#EF6C00',
      textAlign:'center',
      fontWeight:'700',
      fontSize:18
   }
});
