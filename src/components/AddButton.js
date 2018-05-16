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
  Prompt
} from 'react-native';

import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import { Container, Header, Content, ActionSheet } from 'native-base';
import t from 'tcomb-form-native';
import AddFolder from './AddFolder';
import AddFiles from './AddFiles';

var screen = Dimensions.get('window');
var _ = require('lodash');
var BUTTONS = ['Ajouter un dossier', 'Ajouter un fichier', 'Annuler'];
var ADD_FOLDER_INDEX = 0;
var ADD_FILES_INDEX = 1;
var CANCEL_INDEX = 2;

export default class AddButton extends Component {
   constructor(props){
      super(props);
   }

   showAddButton() {
      this.showActionSheet();
      //this.addButton.myModal.open();
      //this._addFolder.showAddFolder();
   }

   showActionSheet() {
      if (this.actionSheet !== null){
         this.actionSheet._root.showActionSheet({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
         },
         buttonIndex => {
            this.setState({ clicked: BUTTONS[buttonIndex] });
            if(buttonIndex === 0){
               //Alert.alert('toto');
               //this.AddModal.showAddModal();
               //this.props.parentFlatList.handleRefresh();
               this.addFolder.showAddFolder();
               //this.props.parentFlatList.handleRefresh();
            }
            if(buttonIndex === 1){
               this.addFiles.showAddFiles();
               //this.props.parentFlatList.handleRefresh();
            }
         });
      }
   }

   render(){
      return(
            <View>
               <ActionSheet ref={(c) => { this.actionSheet = c; }} />
               <AddFolder ref={ref => (this.addFolder = ref)} />
               <AddFiles ref={ref => (this.addFiles = ref)} />
            </View>
      );
   }
}

const styles = StyleSheet.create({

});
