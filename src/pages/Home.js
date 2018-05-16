import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  List,
  FlatList,
  SectionList,
  AsyncStorage,
  RefreshControl,
  Alert,
  Button,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import AddButton from '../components/AddButton';
import AddFolder from '../components/AddFolder';
import RenameFolder from '../components/RenameFolder';
import Swipeout from 'react-native-swipeout';
import { Card, ListItem, Icon } from 'react-native-elements';
import { Container, Header, Content, ActionSheet, Right, Body, Left } from 'native-base';

var BUTTONS = ['Renommer le dossier', 'Supprimer le dossier', 'Annuler'];
var RENAME_FOLDER_INDEX = 0;
//var MOVE_FOLDER_INDEX = 1;
var DELETE_FOLDER_INDEX = 2;
var CANCEL_INDEX = 3;

class FlatListItem extends Component {
   constructor(props){
      super(props);
      this.actionSheet = null;
      this.state = {
         activeRow: null,
         dataSource:''
      };
   }

   deleteFolder(){
      AsyncStorage.getItem('id_token').then((token)=>{
         fetch('http://api.supfile.org/folder/'+this.props.item._id,{
            method:'DELETE',
            headers:{
               'Authorization': token
            },
            body: JSON.stringify({
               _id: this.props.item._id,
            })
         })
         .then((response) => {
            return response.json();
         })
         .then((responseJson) => {
            //console.error(responseJson)
            this.setState({
               dataSource:responseJson
            });
            this.props.parentFlatList.handleRefresh();
         })
         .catch((error) => {
            console.error(error);
         });
      });
   }

   showActionSheet() {
      if (this.actionSheet !== null){
         this.actionSheet._root.showActionSheet({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            //title:'Dossier'
         },
         buttonIndex => {
            this.setState({ clicked: BUTTONS[buttonIndex] });
            if(buttonIndex === 0){
               this.renameFolder.showRenameFolder();
               this.props.parentFlatList.handleRefresh();
            }
            if(buttonIndex === 1){
               this.deleteFolder();
               this.props.parentFlatList.handleRefresh();
            }
         });
      }
   }

   render(){
      return(
         <View>
            <TouchableOpacity onPress={this.props.parentFlatList.allChildsFolder.bind(this)}>
               <Text style={styles.flatListItem}>{this.props.item.name}</Text>
            </TouchableOpacity>
            <Button
               title="Press Me"
               onPress={()=> this.showActionSheet()}
            >
            </Button>
            <ActionSheet ref={(c) => { this.actionSheet = c; }} />
            <RenameFolder ref={ref => (this.renameFolder = ref)} />
         </View>
      );
   }
}

export default class Home extends Component {

   state = {selected: (new Map(): Map<string, boolean>)};

   constructor(props){
      super(props);
      this.addButton = this.addButton.bind(this);
      this.state = {
         dataFolder:'',
         dataFiles:'',
         refreshing:false,
         dataChildsFolder:''
      }
   }

   componentWillMount(){
      this.props.navigation.setParams({
         'onRight' : this.addButton
      });
      this.allFolder();
   }


   handleRefresh = () => {
      this.setState({
         refresh:true
      }),
      this.allFolder();
   }

   allChildsFolder(){
      AsyncStorage.getItem('id_token').then((token)=>{
         fetch('http://api.supfile.org/folder/childs/'+this.props.item._id,{
            method:'GET',
            headers:{
               'Authorization': token
            },
         })
         .then((response) => {
            return response.json();
         })
         .then((responseJson) => {
            //this.add();
            this.setState({
               //dataChildsFolder:responseJson
               dataFolder:responseJson,
               //test: !this.state.test
            });
            this.props.parentFlatList.handleRefresh();
            console.error(responseJson)
         })
         .catch((error) => {
            console.error(error);
         });
      });
   }

   allFolder(){
      AsyncStorage.getItem('id_token').then((token)=>{
         //console.error(token)
         fetch('http://api.supfile.org/folder/childs/null',{
            method:'GET',
            headers:{'Authorization': token }
         })
         .then((response) => {
            return response.json();
         })
         .then((responseJson) => {
            //console.error(responseJson)
            this.setState({
               dataFolder:responseJson,
            });
         })
         .catch((error) => {
            console.error(error);
         });
      });
   }

   addButton(){
      this.refs.addButton.showAddButton();
   }

   // _itemSeparator(){
   //    return <View style={styles.separator}/>
   // }

   _keyExtractor = (item, index) => item._id;

   _renderItem = ({item, index}) => {
      return(
         <FlatListItem
            item={item}
            index={index}
            parentFlatList={this}

            //id={item._id}
            //name={item.name}
            //selected={!!this.state.selected.get(item._id)}
            onPressItem={this.allChildsFolder.bind(this)}
         />
      );
   }



   render(){
      return(
         <View style={styles.container}>
            <FlatList
               data={this.state.dataFolder}
               extraData={this.state.test}
               renderItem={this._renderItem}
               keyExtractor={this._keyExtractor}
               //ItemSeparatorComponent={this._itemSeparator}
               refreshing={this.state.refreshing}
               onRefresh={this.handleRefresh}
            />
            <AddButton ref={'addButton'} parentFlatList={this}/>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      marginTop:5,
      backgroundColor:'white'
   },
   flatListItem:{
      padding:20,
      fontSize:16,
      backgroundColor:'white'
      //marginLeft:'5%'
   },
   separator:{
      height:0.5,
      backgroundColor:'black',
      width:'100%',
      alignSelf:'center',
      //marginLeft:'5%'
   }
});
