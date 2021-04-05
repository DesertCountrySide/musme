
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineDownload } from 'react-icons/ai';

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

    const playAudio = (item) => {
        try {
            console.log(item);
        //   const response = await axiosClient.get(`api/getaudio/id/${id}`)
        //   const mp3 = new Blob([response.data], { type: 'audio/mp3' })
        //   const url = window.URL.createObjectURL(mp3)
        //   const audio = new Audio(url)
        //   audio.load()
        //   await audio.play()
        } catch (e) {
        //   console.log('play audio error: ', e)
        }
      }

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
                    <View style={styles.row}>
                        <View style={{width:500}}>
                            <TouchableOpacity style={styles.atRow} onclick={()=>playAudio(item)}>
                                {/* <AiFillPauseCircle style={{fontSize:30}}/> */}
                                <AiFillPlayCircle style={{fontSize:30}} />
                                <View style={[styles.atColumn], {marginLeft:10}}>
                                    <Text numberOfLines={2} style={styles.nameTxt}>
                                        {item.name}
                                    </Text>
                                    <Text numberOfLines={2} style={styles.moodTxt}>
                                        {(item.attributes[0] != undefined) ? `[Mood: ${item.attributes[0].value}]` : "[Mood: None]"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text numberOfLines={1}>
                                {(item.attributes[1] != undefined) ? item.attributes[1].value : "00.00"}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <AiOutlineDownload style={{fontSize:30}} />
                            </TouchableOpacity>
                        </View>
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
        alignItems: 'center',
        paddingLeft: 10,
        borderColor: "black",
        borderBottomWidth: 1,
    },
    atRow:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    atColumn:{
        flexDirection: 'column',
    }
  });

export default Content;