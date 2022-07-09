import React, { Component } from 'react'
import { Text, View} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//connecting to redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../redux/actions/index';

import FeedScreen from './main/Feed';

import ProfileScreen from './main/Profile';


const Tab = createMaterialBottomTabNavigator();

//Empty component to render the tab bar
const EmptyScreen = () => {
    return (null)
}


export class Main extends Component {

    //First time user will be prompted to login whener the app is opened
    componentDidMount() {
        this.props.fetchUser()
    }

    render() {

        return (
            <Tab.Navigator initialRouteName='Feed' labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen} 
                    options={{

                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),

                    }}/>
                <Tab.Screen name="AddContainer" component={EmptyScreen}
                    
                    //prevent the add screen from appearing 
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate('Add');
                        }

                    })}
                    
                    options={{

                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                        ),

                    }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    options={{

                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        ),

                    }}/>                

            </Tab.Navigator>

        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

//Accessing the fetchUser function from the actions folder (Binding the action creator/Redux to the component)
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);