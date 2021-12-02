import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Dimensions, TextInput, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { Searchbar } from 'react-native-paper';

const Dashboard = ({navigation}) => {

    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [data, setData] = useState(null);

    const [destination, setDestination] = useState([]);

    const [pickupLocation, setPickupLocation] = useState({})
    const [userInput, setUserInput] = useState()


    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync(); //requesting to get current location
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          //To get user's current location
        //   let location = await Location.getCurrentPositionAsync({});
        //   console.log('location -->', location)
        //   setLocation(location.coods); //setting location coordinates i.e latitude, longitude
          const options = {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 3000,
            distanceInterval: 3
          }
          Location.watchPositionAsync(options, ({coords})=>{
            
            setLocation(coords)
            // console.log('Coords==>',coords)
          })
        })();
      }, []);
    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }

    const searchLocation = async () => {
      const {latitude, longitude} = location
      console.log('userInput --->', userInput)
    const res =await fetch(`https://api.foursquare.com/v3/places/search?query=${userInput}&ll=${latitude}%2C${longitude}&radius=2000&limit=40`
        ,{
        method:'GET',
        headers:{
        Accept: 'application/json',
        'Authorization': 'fsq3GaTpi6UpdRBuiCCtAEbtrvg0YoHYvgpKP90yqR4lHyI='
    }
    })

      const result = await res.json();
      if(result == null){
        const test = {
          name: 'test'
        }
        setData(test)
        console.log('no data');
      }
      else{
        console.log('has data');
        setData(result)
      
    }
      // console.log('result data --> ', data)
      // return result
    }  

    const renderItem = ({ item }) => {
        <View>
          <Text  title={item.name}></Text>
        </View>
    }

    const { latitude, longitude } = location

    const ListEmptyComponent = () => {
      return <View>
        <Text>Nothing to Show</Text>
      </View>
    }

    const storeDestination=(item)=>
    {
          const desti=[...destination]
          desti.push(
            item.name,
            item.geocodes.main.latitude,
            item.geocodes.main.longitude
            )
          setDestination(desti)
          console.log('Destination is -->',destination)
    }

    return(
        <View>
            <Searchbar  onChangeText={setUserInput}
          placeholder={'Current Location!'} 
          onIconPress={searchLocation}
          style={{ width: '100%', backgroundColor: '#D9DDE1',marginBottom:5 ,fontSize: 25 }}/>   

   
            {/* 
              {result.map(item => {
                return <View>
                  <Text>{item.name}</Text>
                </View>
              })}
            </ScrollView> */}
            
              
            
            {/* <FlatList data={data} renderItem={renderItem} ListEmptyComponent={ListEmptyComponent}/> */}
            {/* <FlatList style={{ flex:1, height:200}} 
            data={data.results.name} renderItem={renderItem} keyExtractor={item => item.name} /> */}
            
            {/* {data.map(item => {
              return <li>{item.name}</li>
            })} */}
            
            {data == null ?
                console.log('no data found')
              :  
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

            {/* {console.log('user input from text area -->',userInput)} */}
            {/* {console.log('selected destination  -->',destination)} */}
            <MapView
            region={{
                latitude: latitude ||24.8871551,
                longitude:longitude || 67.1621253,
                latitudeDelta:0.0010,
                longitudeDelta:0.0010
            }}
            style={styles.map}
            >
            <Marker 
            coordinate={{
              latitude: latitude ||24.8871551,
              longitude:longitude || 67.1621253,
            }}
            title={'pickUp'}
            /> 
           </MapView>
            <Button
            title="Choose Destination"
            onPress={() => navigation.navigate('Destination')}
            />  
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
export default Dashboard;