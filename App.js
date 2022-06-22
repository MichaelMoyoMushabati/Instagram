import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View} from 'react-native';

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { initializeApp } from "firebase/app"

//Importing Redux Here
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADuFlLwVLm7Y-Z-rNiisH0Jel8QFdcdYY",
    authDomain: "instagram-dev-d5d8a.firebaseapp.com",
    projectId: "instagram-dev-d5d8a",
    storageBucket: "instagram-dev-d5d8a.appspot.com",
    messagingSenderId: "736508871904",
    appId: "1:736508871904:web:a4173f824c3770ad427c85",
    measurementId: "G-46C5L6TCG7"
};

if(firebase.apps.length === 0){ //if the firebase app is not initialized, initialize it
    firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegistrationScreen from './components/auth/Register'
import MainScreen from './components/Main';
import LoginScreen from './components/auth/Login';

const Stack =  createStackNavigator();



export class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({
            loggedIn: false,
            loaded: true,
        })
      } else {
        this.setState({
            loggedIn: true,
            loaded: true,
        })
      }
    })
  }
  render() {
    const { loaded, loggedIn } = this.state;
    if (!loaded) {
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text>Loading</Text>
        </View>
      )

    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Landing">
              <Stack.Screen  name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
              <Stack.Screen  name="Register" component={RegistrationScreen}/>
              <Stack.Screen  name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Main">
              <Stack.Screen  name="Main" component={MainScreen} options={{ headerShown: false }}/>
          </Stack.Navigator> 
        </NavigationContainer>       
      </Provider>
      
    )
  }
}

export default App


