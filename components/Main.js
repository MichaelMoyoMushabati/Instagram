import React, { Component } from 'react'
import { Text, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//connecting to redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../redux/actions/index';
import FeedScreen from '../components/main/Feed';

const Tab = createBottomTabNavigator();


export class Main extends Component {

    //First time user will be prompted to login whener the app is opened
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {

        return (
            <Tab.Navigator>
                <Tab.Screen name="Feed" component={FeedScreen} 
                options={{

                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
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