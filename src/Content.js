
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Content = () => {
    const secretToken = "secret_yjrwZASe4jNqg571avHhSfgDbKegqLRQ"
    const storeId = 36603154
    const ordersURL = `https://app.ecwid.com/api/v3/${storeId}/orders?token=${secretToken}`
    const productsURL = `https://app.ecwid.com/api/v3/${storeId}/products?token=${secretToken}`
    const categoryURL = `https://app.ecwid.com/api/v3/${storeId}/categories?token=${secretToken}&productIds=true&parent=60789679`
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    useState(()=>{
        try {
            fetch(categoryURL).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                var category = res.data
                var productIds = [];
                console.log(category)
                for(var x in category.items){
                    productIds = productIds.concat(category.items[x].productIds)
                }
                console.log(productIds)
                    fetch(productsURL).then(response =>
                        response.json().then(data => ({
                            data: data,
                            status: response.status
                        })
                    ).then(res => {
                        var newdata = res.data.items.filter((prod) => productIds.includes(prod.id))
                        setResults(newdata)
                    }));
            }));
          } catch (err) {
            console.log(err);
          }
    },[])

    return (
        <ScrollView style={styles.list}>
            <FlatList
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            data={results}
            numColumns={1}
            keyExtractor={result => result.name}
            renderItem={({item}) => {
                return (
                    <View>
                        <TouchableOpacity style={styles.row}>
                            <Text numberOfLines={2} style={styles.nameTxt}>
                                {item.name}
                                <Text numberOfLines={2} style={styles.moodTxt}>
                                    {(item.attributes[0] != undefined) ? `[Mood: ${item.attributes[0].value}]` : "[Mood: None]"}
                                </Text>
                            </Text>
                            <Text numberOfLines={1}>
                                {(item.attributes[1] != undefined) ? item.attributes[1].value : "00.00"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    list: {
        margin: 50
    },
    nameTxt:{
        fontSize: 20
    },
    moodTxt:{
        fontSize: 14,
        color: 'grey'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        // textAlign: "left",
        paddingLeft: 10,
        borderColor: "black",
        borderBottomWidth: 1,
    },
  });

export default Content;