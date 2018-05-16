import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import t from 'tcomb-form-native';
import {Actions} from 'react-native-router-flux';

const Form = t.form.Form;

const User = t.struct({
   email: t.String,
   password: t.String
});

var _ = require('lodash');

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;
stylesheet.textbox.normal.width = 280;
stylesheet.textbox.error.width = 280;
//stylesheet.textbox.normal.color = 'black';
//stylesheet.textbox.error.color = 'white';
//stylesheet.textboxView.normal.borderColor = 'white';
stylesheet.textboxView.error.borderColor = '#a94442';
//stylesheet.controlLabel.normal.color = 'white';

const options = {
   fields:{
      email:{
         label:'E-Mail',
         //placeholder:'Adresse E-Mail',
         returnKeyType:'next',
         stylesheet:stylesheet
      },
      password:{
         label:'Mot de passe',
         //placeholder:'Mot de passe',
         secureTextEntry: true,
         stylesheet:stylesheet
      }
   }
};

export default class LoginForm extends Component {

   async saveToken(item, selectedValue){
      try {
         await AsyncStorage.setItem(item, selectedValue);
      } catch (error) {
         console.error('AsyncStorage error' + error.message);
      }
   }

   loginUser() {
      const value = this.refs.form.getValue();
      if (value){
         fetch('http://api.supfile.org/auth/login',{
            method:'POST',
            headers:{
               'Accept':'application/json',
               'Content-Type':'application/json'
            },
            body: JSON.stringify({
               email: value.email,
               password: value.password,
            })
         })
         .then((response) => {
            return response.json();
         })
         .then((responseData) => {
            AsyncStorage.setItem('id_token', responseData.token)
            //console.error(responseData)
            this.home();
         })
         .catch((error) => {
            alert('Error')
         })
         .done();
      }
   }

   home(){
      Actions.home()
   }

   register(){
      Actions.register()
   }

   render(){
      return(
         <View style={styles.container}>
            <Form
               ref="form"
               type={User}
               options={options}
            />
            <TouchableOpacity onPress={this.loginUser.bind(this)} style={styles.login}>
               <Text style={styles.loginText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.register} style={styles.register}>
               <Text style={styles.registerText}>Créer un compte</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container:{
      justifyContent:'center',
      alignItems:'center'
   },
   login:{
      width:300,
      backgroundColor:'#EF6C00',
      paddingHorizontal:15,
      paddingVertical:10,
      marginVertical:5,
      borderRadius:25,
      marginVertical:20
   },
   register:{
      width:300,
      backgroundColor:'white',
      paddingHorizontal:15,
      paddingVertical:10,
      marginVertical:5,
      borderRadius:25,
      borderWidth:3,
      borderColor:'#EF6C00',
      marginVertical:10
   },
   loginText:{
      color:'white',
      textAlign:'center',
      fontWeight:'700',
      fontSize:19
   },
   registerText:{
      color:'#EF6C00',
      textAlign:'center',
      fontWeight:'700',
      fontSize:18
   }
});
