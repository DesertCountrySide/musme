
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineDownload } from 'react-icons/ai';
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
import AuthContext from './context/AuthContext';
import { Multiselect } from 'multiselect-react-dropdown';
const API_KEY = process.env.REACT_APP_API_KEY
const ordersEndPoint = `${process.env.REACT_APP_END_POINT}api/ecwid/orders`
const productsEndPoint = `${process.env.REACT_APP_END_POINT}api/ecwid/products`

const Main = () => {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [moods, setMoods] = useState([]);
    const [selectedMood, setSelectedMood] = useState([]);
    const [selectedTempo, setSelectedTempo] = useState([]);
    const [loaderHide, setLoaderHide] = useState("")
    const [subscribed, setSubscribed] = useState(true)
    const [audioSrc, setAudioSrc] = useState();
    const audioRef = useRef()
    const status = useContext(AuthContext);
    document.title = "MusMeApp"

    useEffect(()=>{
        try {
            var moodArray = [];
            const email = localStorage.getItem("user_email");
            axios.post(ordersEndPoint, {"email": email})
                .then(response => {
                    if(!response.data.isSubscribed){
                        setSubscribed(false)
                    }else{
                        axios.get(productsEndPoint)
                        .then(response => {
                            setResults(response.data)
                            setSearchResult(response.data)
                            for(var item in response.data){
                                if(response.data[item].attributes[0] != undefined){
                                    moodArray = moodArray.concat(response.data[item].attributes[0].value.split(', '))
                                }
                            }
                            moodArray = [...new Set(moodArray)]
                            var newMoodArr = []
                            for(var moodItem in moodArray){
                                newMoodArr.push({'name': moodArray[moodItem]}) 
                            }
                            setMoods(newMoodArr)
                            setLoaderHide("none")
                        })
                    }
                })
        } catch (err) {
            console.log(err);
        }
    },[])

    const updateSearchResult = (searchTerm) => {
        setSearch(searchTerm);
        searchTerm == "" ? setSearchResult(results) : setSearchResult(results.filter(item => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase()) && (item.attributes[0] != undefined) ? item.attributes[0].value.includes(selectedMood): "" && (item.attributes[6] != undefined) ? item.attributes[6].value.includes(selectedTempo) : ""
        }))
    }

    const logoutAction = () => {
        localStorage.clear();
        setAuthToken(false);
        status.setAuthState("signedOut")
    }

    const onMoodSelect = (selectedList, selectedItem) => {
        setSelectedMood(selectedList.map(data => data.name))
        setSearchResult(results.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase()) && (item.attributes[0] != undefined) ? item.attributes[0].value.includes(selectedList.map(data => data.name)): "" && (item.attributes[6] != undefined) ? item.attributes[6].value.includes(selectedTempo) : ""
        }))
    }

    const onTempoRemove = (selectedList, removedItem) => {
        var index = results.indexOf(removedItem);
        index > -1 ? results.splice(index, 1) : ""
        setSelectedTempo([])
        setSearchResult(results.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase()) && (item.attributes[0] != undefined) ? item.attributes[0].value.includes(selectedList.map(data => data.name)): "" && (item.attributes[6] != undefined) ? item.attributes[6].value.includes([]) : ""
        }))
    }

    const onTempoSelect = (selectedList, selectedItem) => {
        setSelectedTempo(selectedList.map(data => data.name))
        setSearchResult(results.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase()) && (item.attributes[0] != undefined) ? item.attributes[0].value.includes(selectedMood): "" && (item.attributes[6] != undefined) ? item.attributes[6].value.includes(selectedList.map(data => data.name)) : ""
        }))
    }

    const onMoodRemove = (selectedList, removedItem) => {
        var index = results.indexOf(removedItem);
        index > -1 ? results.splice(index, 1) : ""
        setSelectedMood([])
        setSearchResult(results.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase()) && (item.attributes[0] != undefined) ? item.attributes[0].value.includes([]): "" && (item.attributes[6] != undefined) ? item.attributes[6].value.includes(selectedTempo) : ""
        }))
    }

    const downloadAudio = (item) => {
        try {
            const fileURL = item.files[0].adminUrl;
            const link = document.createElement('a');
            link.href = fileURL + "?token=" + API_KEY;
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (e) {
          console.log('play audio error: ', e)
        }
      }

    const playAudio = (item) => {
        try {
            const fileURL = item.files[0].adminUrl;
            const audioURL = fileURL + "?token=" + API_KEY;
            setAudioSrc(audioURL)
            if(audioRef.current){
                audioRef.current.pause();
                audioRef.current.load();
                audioRef.current.play();
            }
        } catch (e) {
          console.log('play audio error: ', e)
        }
    }

      return (subscribed) ?  (
        <>
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
                        onChangeText = {(val) => updateSearchResult(val)}
                        placeholder = "Enter music name"
                    />
                </View>
                <View style = {styles.multiselectContainer}>
                    <Multiselect
                        options={moods}
                        showCheckbox="true"
                        onSelect={onMoodSelect}
                        onRemove={onMoodRemove}
                        displayValue="name"
                        selectionLimit="1"
                        placeholder="Select Mood"
                    />
                </View>
                <View style = {styles.multiselectContainer}>
                    <Multiselect
                        options={[{"name": "Very Slow"}, {"name": "Slow"}, {"name": "Medium"}, {"name": "Fast"}, {"name": "Very Fast"}]}
                        showCheckbox="true"
                        onSelect={onTempoSelect}
                        onRemove={onTempoRemove}
                        displayValue="name"
                        selectionLimit="1"
                        placeholder="Select Tempo"
                    />
                </View>
                <View style={{backgroundColor: "black", height:30, flex: 1, justifyContent:"center", margin:10}}>
                    <TouchableOpacity onPress={() => logoutAction()}>
                        <Text style={{color:"white"}}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <ScrollView style={styles.list}>
            <View style={{textAlign: "center", display: loaderHide}}><Text>Loading...</Text></View>
            <FlatList
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                data={searchResult}
                numColumns={1}
                keyExtractor={result => (result.id).toString()}
                renderItem={({item}) => {
                    return (
                        <View style={styles.row}>
                            <View style={{width:500}}>
                                <TouchableOpacity style={styles.atRow} onPress={() => playAudio(item)}>
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
                                <TouchableOpacity onPress={() => downloadAudio(item)}>
                                    <AiOutlineDownload style={{fontSize:30}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />
        </ScrollView>
        <View>
            <audio style={{width: "100%"}} controls ref={audioRef}>
                <source src={audioSrc} />
            </audio>
        </View>
        </>
    )
    : (
        <View>
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
                    <View style={{backgroundColor: "black", height:30, flex: 1, justifyContent:"center", margin:10}}>
                        <TouchableOpacity onPress={() => logoutAction()}>
                            <Text style={{color:"white"}}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{textAlign:"center", height:"100%", justifyContent:"center"}}>
                <Text style={{fontSize:"24px"}}>Either you are not subscribed or your subscription has been expired. Please purchase or renew it using this link:&nbsp;&nbsp;&nbsp;
                    <a href="https://www.twinsmusicny.com/store.html?store-page=MOODS-c60789679" target="_blank">Twinsmusicny</a>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingRight:20,
        paddingBottom:10,
        backgroundColor:"lightgrey"
    },
    logo: {
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
    },
    multiselectContainer:{
        zIndex:999999,
        fontSize: 14,
        color: "#666",
        backgroundColor:'#dddaaa',
    },
    list: {
        marginLeft: 50,
        marginRight: 50,
        zIndex:-1
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
  });

export default Main;