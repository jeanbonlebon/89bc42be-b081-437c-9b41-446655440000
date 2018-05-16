import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  List,
  TextInput,
  Dimensions,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';

import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import { Container, Header, Content, ActionSheet } from 'native-base';
import t from 'tcomb-form-native';
import Home from '../pages/Home';

var screen = Dimensions.get('window');
var _ = require('lodash');

const Form = t.form.Form;
const Folder = t.struct({
   name: t.String
});

const modalStyleSheet = _.cloneDeep(t.form.Form.stylesheet);
const options = {
   fields:{
      name:{
         label:'Nouveau nom',
         stylesheet: modalStyleSheet
      }
   }
};

modalStyleSheet.textbox.normal.borderWidth = 0;
modalStyleSheet.textbox.error.borderWidth = 0;
modalStyleSheet.textbox.normal.marginBottom = 0;
modalStyleSheet.textbox.error.marginBottom = 0;
modalStyleSheet.textboxView.normal.borderWidth = 0;
modalStyleSheet.textboxView.error.borderWidth = 0;
modalStyleSheet.textboxView.normal.borderRadius = 0;
modalStyleSheet.textboxView.error.borderRadius = 0;
modalStyleSheet.textboxView.normal.borderBottomWidth = 1;
modalStyleSheet.textboxView.error.borderBottomWidth = 1;
modalStyleSheet.textbox.normal.marginBottom = 5;
modalStyleSheet.textbox.error.marginBottom = 5;
modalStyleSheet.textboxView.error.borderColor = '#a94442';
modalStyleSheet.textbox.normal.width = 280;
modalStyleSheet.textbox.error.width = 280;

export default class AddFolder extends Component {
   constructor(props){
      super(props);
      this.state = {
         modalVisible: false,
      };
   }

   showRenameFolder(){
      this.setModalVisible(true);
   }

   setModalVisible(visible) {
       this.setState({modalVisible: visible});
   }

   renameFolder(){
      AsyncStorage.getItem('id_token').then((token)=>{
         const value = this.refs.form.getValue();
         if (value){
            fetch('http://api.supfile.org/folder/rename/'+this.props.item._id,{
               method:'PUT',
               headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json',
                  'Authorization': token
               },
               body: JSON.stringify({
                  name: value.name,
                  _id: this.props.item._id,
               })
            })
            .then((response) => response.text())
            .then((responseData) => {
               //this.props.parentFlatList.handleRefresh();
               this.setModalVisible(!this.state.modalVisible);
               //console.error(responseData)
            })
            .done();
         }
      });
   }

   render(){
      return(
         <View style={styles.container}>
            <Modal
               animationType='slide'
               transparent={false}
               visible={this.state.modalVisible}
               onRequestClose={() => {
                  this.setModalVisible(!this.state.modalVisible);
               }}>
               <View style={styles.modalContainer}>
                  <Form
                     ref="form"
                     type={Folder}
                     options={options}
                  />
                  <TouchableOpacity onPress={this.renameFolder.bind(this)} style={styles.modalAdd}>
                     <Text style={styles.modalText}>Renommer</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: 'red'
   },
   modalContainer:{
      backgroundColor:'white',
      padding:22,
      justifyContent:'center',
      alignItems:'center',
      //borderRadius:5,
   },
   modalText:{
      color:'white',
      textAlign:'center',
      fontWeight:'700',
      fontSize:18
   },
   modalAdd:{
      width:300,
      backgroundColor:'#EF6C00',
      paddingHorizontal:15,
      paddingVertical:10,
      marginVertical:5,
      borderRadius:25
   }
});
