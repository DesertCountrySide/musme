

import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const TopNavigationBar = () => {
    const [search, setSearch] = useState("")

    return (
        <View style={styles.mainView}>
            <Image 
                style={styles.logo}
                source={{
                    uri: "https://i.ibb.co/4jwZbFD/musme-logo.png"
                }}
            />
            <TextInput
                style = {styles.input}
                value = {search}
                onChangeText = {(val) => setSearch(val)}
                placeholder = "Enter Search term"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainView:{
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    logo:{
        width: 250,
        height: 80,
        resizeMode: 'contain'
    },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
    },
  });

export default TopNavigationBar;