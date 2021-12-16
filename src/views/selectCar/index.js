import React, { useState } from 'react'
import { View,Button } from 'react-native'
import { List } from "react-native-paper";

export default  CarSelection=({route})=>{
    const {finalDis} = route.params;
    console.log("Car Screen distance--->",finalDis)
    const miniFare=25*finalDis
    const goFare=45*finalDis
    const bFare=60*finalDis
    const[selectRide,setSelectRide]=useState()
    console.log(`Car is ${cars} & Fare is ${selectRide} `)
    const[cars,setCar]=useState()
    return  <View >
                    <List.Section>
                    <List.Subheader style={{fontSize:15,color:'indigo'}}>Select Your Ride</List.Subheader>
                    <List.Item
                        style={{backgroundColor:'#C3C7C8'}}
                        title='Mini'
                        description={miniFare}
                        onPress={()=>{{
                            setSelectRide(miniFare)
                            setCar('Mini')
                        }}}
                        left={() => <List.Icon icon="car" />}  />
                    <List.Item
                        style={{backgroundColor:'#C3C7C8',marginTop:3}}
                        title='Go'
                        description={goFare}
                        onPress={()=>{{
                            setSelectRide(goFare)
                            setCar('GO')
                         } }}
                        left={() => <List.Icon icon="car-side" />}  
                    />
                    <List.Item
                        style={{backgroundColor:'#C3C7C8',marginTop:3}}
                        title='Bussiness'
                        description={bFare}
                        onPress={()=>{{
                            setSelectRide(bFare)
                            setCar('Bussiness')
                        }}}
                        left={() => <List.Icon icon="car-sports" />}  
                    />
                    </List.Section> 
                    <Button title='Chalo!' onPress={()=>alert(`Fare is ${selectRide}`)}></Button>
                </View> 
}