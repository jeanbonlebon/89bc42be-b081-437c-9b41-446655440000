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
            <TouchableOpacity onPress={this.logout.bind(this)}>
               <Text>Se déconnecter</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      backgroundColor:'white'
   },
   user:{
      fontSize:16,

   }
});
