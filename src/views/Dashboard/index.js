import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Dimensions, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { Searchbar } from 'react-native-paper';


export default Dashboard = ({navigation}) => {

    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [data, setData] = useState(null);
    const [userInput, setUserInput] = useState()
    const [currentLoc, setCurrentLoc] = useState([]);
  
    const [selectedLocLat, setSelectedLocLat] = useState();
    const [selectedLocLong, setSelectedLocLong] = useState();
    
    // const [finalLocLat, setFinalLocLat] = useState();
    // const [finalLocLong, setFinalLocLong] = useState();
    // const [nameOfLoc,setNameOfLoc] = useState();
    // const [nameOfFinalLoc,setNameOfFinalLoc] = useState();
    // const [selectedLoc, setSelectedLoc] = useState([nameOfFinalLoc,finalLocLat,finalLocLong]);
    // console.log("selecteddd===========>",selectedLoc)
    
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync(); //requesting to get current location
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          //To get user's current location
          let location = await Location.getCurrentPositionAsync({});
          console.log('location -->', location)
          setLocation(location.coords); 
          //setting location coordinates i.e latitude, longitude
          // const options = {
          //   accuracy: Location.Accuracy.Highest,
          //   timeInterval: 3000,
          //   distanceInterval: 3
          // }
          // Location.watchPositionAsync(options, ({coords})=>{
            
          //   setLocation(coords)
          //   // console.log('Coords==>',coords)
          // })
        })();
      }, []);
    


//       const resp = await fetch(`https://api.foursquare.com/v2/venues/search?client_id=QEJ3YKKOS5HOCE4ANKTO4UWF1ERT4SJBNIXPWZGBE0VY02UI&client_secret=QD2I1K00RYVZ5A4TGQFUK3FVZOY44CPZX2NNA25KDQP5NVLI&ll=${latitude},${longitude}&v=20180323`)

//       .then(resp => resp.json())
//       .then(resp =>
//       setNameOfLoc(resp.response.venues[0].name)) 

// setFinalLocLat(selectedLocLat? selectedLocLat : latitude)
// setFinalLocLong(selectedLocLong? selectedLocLong : longitude)






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
        'Authorization': 'fsq3GaTpi6UpdRBuiCCtAEbtrvg0YoHYvgpKP90yqR4lHyI='}
    })

      const result = await res.json();
      if(result == null){
        console.log('no data');
      }
      else{
        console.log('has data');
        setData(result)
    }}
    const { latitude, longitude }=location
    const storeCurrentLocation=(item)=>
    {
      const[name,latitude,longitude]=[item.name,item.geocodes.main.latitude,item.geocodes.main.longitude]
      // setNameOfFinalLoc(name?name:nameOfLoc)
      setSelectedLocLat(latitude);
      setSelectedLocLong(longitude);
      currentLoc.push(name,latitude,longitude)
      setCurrentLoc(currentLoc)
      console.log('selected location is--->',currentLoc)}
    return(
        <View>   
            <Searchbar
            onChangeText={setUserInput} 
            value={userInput}
            placeholder={'Current Location!'} 
            onIconPress={searchLocation}
            style={{ width: '100%', backgroundColor: '#D9DDE1',marginBottom:5 ,fontSize: 25 }}/>     
            {data == null ?
                console.log('no data found')
              :  
              data.results.map((item,index) => { 
                  return <ScrollView key={index} style={{paddingHorizontal:10}}>
                    <Text style={{
                      fontSize:15, 
                      backgroundColor:'#fff', 
                      marginVertical:6,
                      }} onPress={()=>storeCurrentLocation(item)}>{item.name}</Text>
                  </ScrollView>
                })
             }

            {/* {console.log('user input from text area -->',userInput)} */}
            {/* {console.log('selected current Location  -->',currentLoc)} */}
            <MapView
            region={{
              latitude:  selectedLocLat || latitude ||24.8871551,
              longitude: selectedLocLong  || longitude || 67.1621253,
                latitudeDelta:0.0020,
                longitudeDelta:0.0020
            }}
            style={styles.map} >
            <Marker 
            coordinate={{
              latitude:  selectedLocLat || latitude ||24.8871551,
              longitude: selectedLocLong  || longitude || 67.1621253,

            }}
            title={'pickUp'} /> 
           </MapView>
            <Button
            title="Select Destination"
            onPress={() => navigation.navigate('Destination',currentLoc)}
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
