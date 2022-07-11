import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity} from 'react-native';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { storage } from "firebase/storage";
require('firebase/firestore');

export default function Search(props) {

    const [users, setUsers] = useState([]);

    const fetchUsers = (search) => {

        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map((doc) => {

                        const data = doc.data();
                        const id = doc.id;
                        return {id, ...data}
                });
                setUsers(users);
            })
    }

    return (
        <View>
            <TextInput 
                placeholder="Search Here" 
                onChangeText={(search) => fetchUsers(search)} />

            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({item}) => (

                    <TouchableOpacity

                        onPress={() => props.navigation.navigate('Profile', {uid: item.id})}>
                        <Text>{item.name}</Text>

                    </TouchableOpacity>

                

                )}
            
            />

        </View>
    )
}
