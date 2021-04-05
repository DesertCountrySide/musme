

import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Multiselect } from 'multiselect-react-dropdown';

const TopNavigationBar = () => {
    const [search, setSearch] = useState("")

    return (
        <View style={styles.mainView}>
            <View>
                <Image 
                    style={styles.logo}
                    source={{
                        uri: "https://i.ibb.co/4jwZbFD/musme-logo.png"
                    }}
                />
            </View>
            <View style={styles.atRow}>
                <View style={styles.atRow}>
                    <TextInput
                        style = {styles.input}
                        value = {search}
                        onChangeText = {(val) => setSearch(val)}
                        placeholder = "Enter Search term"
                    />
                    <TouchableOpacity>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Multiselect style = {styles.input}
                        options={[{name: 'Srigar', id: 1},{name: 'Sam', id: 2}]} // Options to display in the dropdown
                        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        showCheckbox="true"
                        // onSelect={this.onSelect} // Function will trigger on select event
                        // onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                    />
                </View>
            </View>
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
    atRow:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    atColumn:{
        flexDirection: 'column',
    }
  });

export default TopNavigationBar;