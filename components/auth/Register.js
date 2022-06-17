import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getAuth, onAuthStateChanged } from "firebase/auth";

export class Register extends Component { 
    constructor(props) {//need to initialize the state in the constructor, which is called when the component is created
        super(props); //super is a reference to the parent class like in Java
        
        this.state = {
            email: '',
            password: '',
            name: '',
        }
        this.onSignUp = this.onSignUp.bind(this);//sends this to the onSignUp function
    }

    onSignUp(){ //function declaration to sign up a user 

        const { email, password, name } = this.state;//grabbing the state from the form
        firebase.auth().createUserWithEmailAndPassword(email, password)//creates a user with the email and password
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log(result)
 
            })
            .catch((error) => {
                console.log(error)
            })

    }
    render() {
        return (//more like a form or a page for registering a user
            <View>
                <TextInput
                    placeholder="name"
                    onChangeText={(name) => this.setState({name})}
                />
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry = {true} //secure text entry of the password
                    onChangeText={(password) => this.setState({password})}
                /> 
                <Button

                    onPress={ () => this.onSignUp()}
                    title="Sign Up"
                
                />                               
            </View>

        )
    }
}

export default Register