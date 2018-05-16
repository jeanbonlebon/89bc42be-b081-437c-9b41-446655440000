import React, { Component } from 'react';
import {Button} from 'react-native-elements';
import {
   Router,
   Stack,
   Scene,
   Tabs
} from 'react-native-router-flux';

import {
   AsyncStorage,
   ActivityIndicator
} from 'react-native';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddFolder from './components/AddFolder';

export default class Routes extends Component {

   constructor(){
      super();
      this.state = {
         hasToken: false
      };
   }

   componentWillMount(){
      AsyncStorage.getItem('id_token').then((token) => {
         this.setState({ hasToken:token != null })
      });
   }

   render() {
      return (
         <Router>
            <Scene key="root" hideNavBar={true}>
               <Scene key="login" component={Login} title="Login" initial={!this.state.hasToken}/>
               <Scene key="register" component={Register} title="Se connecter" hideNavBar={false}/>
               <Scene key="home" tabs={true} tabBarPosition='bottom' initial={this.state.hasToken}>
                  <Scene
                     key='folder'
                     component={Home}
                     title='Accueil'
                     onRight={()=>{}}
                     rightTitle={' Ajouter'}
                     showIcon={true}
                     //swipeEnabled={false}
                  />
                  <Scene
                     key='profile'
                     component={Profile}
                     title='Profil'
                     onRight={()=>{}}
                     rightTitle={' Modifier'}
                     showIcon={true}
                  />
               </Scene>
            </Scene>
         </Router>
      );
   }
}
