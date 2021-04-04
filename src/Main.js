
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Content from './Content';
import TopNavigationBar from './TopNavigationBar';

const Main = () => {

    return (
        <View style = {styles.mainView}>
            <TopNavigationBar />
            <Content />
        </View>
    );
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1
    }
});

export default Main;