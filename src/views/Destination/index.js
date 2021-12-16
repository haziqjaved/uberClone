import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Dimensions, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { Searchbar } from 'react-native-paper';


export default Dashboard = ({route, navigation}) => {
      const [errorMsg, setErrorMsg] = useState(null);
      const [data, setData] = useState(null);
      const [userInput, setUserInput] = useState()
      const [destination, setDestination] = useState([]);
      const [disLocLat, setDisLocLat] = useState();
      const [disLocLong, setDisLocLong] = useState();
  

      console.log('navigation --->',route.params)
      const[name,latitude,longitude]=route.params
  
      //only granted a map to render 
      useEffect(() => {
          (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync(); //requesting to get current location
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
          }
          )();
        }, []);
      
        let text = 'Waiting..';
        if (errorMsg) {
          text = errorMsg;
        }
         else  {
          text = JSON.stringify();  //(location)
        }
  
      const search= async () => {
        console.log('userInput --->', userInput)
      const res =await fetch(`https://api.foursquare.com/v3/places/search?query=${userInput}&ll=${latitude}%2C${longitude}&radius=7000&limit=03`
          ,{
          method:'GET',
          headers:{
          Accept: 'application/json',
          'Authorization': 'fsq3GaTpi6UpdRBuiCCtAEbtrvg0YoHYvgpKP90yqR4lHyI='
      }
      })
  
        const result = await res.json();
        if(result == null){
          console.log('no data');
        }
        else{
          console.log('has data');
          setData(result)
      }}  
      const storeDestination=(item)=>
      {     
         const[desName,desLatitude,desLongitude]=[item.name,item.geocodes.main.latitude,item.geocodes.main.longitude]
        destination.push(desName,desLatitude,desLongitude)
        setDisLocLat(desLatitude);
        setDisLocLong(desLongitude);
        setDestination(destination)
        console.log("Destination======>",destination)
      }
      function calcCrow(latitude,longitude,disLocLat,disLocLong) {
        var R = 6371 // km
        var dLat = toRad(disLocLat - latitude)
        var dLon = toRad(disLocLong - longitude)
        var lat1 = toRad(latitude)
        var lat2 = toRad(disLocLat)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        var d = R * c
        return d
      }
    
      // Converts numeric degrees to radians
      function toRad(Value) {
          return Value * Math.PI / 180
      }
      const dis =Math.round( calcCrow(latitude, longitude, disLocLat, disLocLong))
      console.log('total distance -->',dis)

    return(
          <View>
              <Text>Pickup location:{name}</Text>
              <Searchbar
              onChangeText={setUserInput} 
              value={userInput}
              placeholder={'Current Location!'} 
              onIconPress={search}
              style={{ width: '100%', backgroundColor: '#D9DDE1',marginBottom:5 ,fontSize: 25 }}/>
              
              {data == null ?
                  console.log('no data found'):
                  data.results.map((item,index) => { 
                    return <ScrollView key={index} style={{paddingHorizontal:10}}>
                      <Text style={{
                        fontSize:15, 
                        backgroundColor:'#fff', 
                        marginVertical:6,
                        }} onPress={()=>storeDestination(item)}>{item.name}</Text>
                    </ScrollView>
                  })
               }
              <MapView
              region={{
                latitude: disLocLat ||longitude,
                longitude:  disLocLong ||  latitude,
                latitudeDelta:0.0300,
                longitudeDelta:0.0300
              }}
              style={styles.map} >
              <Marker 
              coordinate={{
                latitude: disLocLat || latitude,
                longitude:  disLocLong || longitude,
              }}
              title={name} /> 
             </MapView>
              <Button
              title="Choose Cars"
              onPress={() => navigation.navigate('CarSelection',{
                finalDis : dis,      })}
              />  
         </View>
      )
  }
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.625,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
    });