import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import t from 'tcomb-form-native';
import {Actions} from 'react-native-router-flux';

const Form = t.form.Form;
const User = t.struct({
   email: t.String,
   password: t.String,
   firstName: t.String,
   lastName: t.String,
   //terms:t.Boolean
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
//stylesheet.textbox.normal.color = 'white';
//stylesheet.textbox.error.color = 'white';
//stylesheet.textboxView.normal.borderColor = 'white';
stylesheet.textboxView.error.borderColor = '#a94442';
//stylesheet.controlLabel.normal.color = 'white';

const options = {
   fields:{
      email:{
         label:'Adresse E-Mail',
         returnKeyType:'next',
         stylesheet:stylesheet
      },
      password:{
         label:'Mot de passe',
         secureTextEntry: true,
         returnKeyType:'next',
         stylesheet:stylesheet
      },
      firstName:{
         label:'Prénom',
         returnKeyType:'next',
         stylesheet:stylesheet
      },
      lastName:{
         label:'Nom',
         stylesheet:stylesheet
      },
      // terms:{
      //    label:"Accepter les Conditions Générales d'Utilisation"
      // }
   }
};

export default class RegisterForm extends Component {

   signUp(){
      const value = this.refs.form.getValue();
      if (value){
         fetch('http://api.supfile.org/auth/register',{
            method:'POST',
            headers:{
               'Accept':'application/json',
               'Content-Type':'application/json'
            },
            body: JSON.stringify({
               email: value.email,
               password: value.password,
               firstName: value.firstName,
               lastName: value.lastName,
            })
         })
         .then((response) => response.json())
         .then((responseData) => {
            alert('Enregister'),
            this.login();
         })
         .done();
      }
   }

   home(){
      Actions.home()
   }

   login(){
      Actions.login()
   }

   render(){
      return(
         <View style={styles.container}>
            <Form
               ref="form"
               type={User}
               options={options}
            />
            <TouchableOpacity onPress={this.signUp.bind(this)} style={styles.register}>
               <Text style={styles.registerText}>Créer un compte</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container:{
      justifyContent:'center',
      alignItems:'center',
   },
   inputText:{
      width:300,
      paddingHorizontal:15,
      marginVertical:5,
      borderRadius:25,
      fontSize:15,
      color:'white'
   },
   register:{
      width:300,
      backgroundColor:'#EF6C00',
      paddingHorizontal:15,
      paddingVertical:10,
      marginVertical:5,
      borderRadius:25,
      marginVertical:20
   },
   registerText:{
      color:'white',
      textAlign:'center',
      fontWeight:'700',
      fontSize:19
   },
   login:{
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
      color:'#EF6C00',
      textAlign:'center',
      fontWeight:'700',
      fontSize:18
   }
});
