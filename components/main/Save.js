import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button, Image } from 'react-native';


import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
//import 'firebase/compat/firebase-storage';
import { storage } from "firebase/storage";

export default function Save(props) {
    
    const [caption, setCaption] = useState('');
    const childPath = 'post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}';
    console.log(childPath);

 

    const uploadImage = async () => {

        const uri = props.route.params.Image;
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log('transferred: ${snapshot.bytesTransferred}')
        };

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                console.log(snapshot);
            })
        }

        const taskError = snapshot => {
            console.log(snapshot);
        }

        task.on('state_changed', taskProgress, taskError, taskCompleted);

    }

    return (
        <View style={{flex: 1}}>
            <Image source={{uri: props.route.params.image}} />
            <TextInput
                placeholder='Enter a caption . . . '
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="Save" onPress={ () => uploadImage()}/>

        </View>
    )
}
