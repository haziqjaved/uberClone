import React from 'react'
import { View,Text } from 'react-native'
import { List } from "react-native-paper";

export default function selectCar(){
    return  <View >
                    <List.Section>
                    <List.Subheader style={{fontSize:15,color:'indigo'}}>Select Your Ride</List.Subheader>
                    <List.Item
                        style={{backgroundColor:'#C3C7C8'}}
                        title='Mini'
                        left={() => <List.Icon icon="car" />}  
                    />
                                        <List.Item
                        style={{backgroundColor:'#C3C7C8',marginTop:3}}
                        title='Go'
                        left={() => <List.Icon icon="car-side" />}  
                    />
                    <List.Item
                        style={{backgroundColor:'#C3C7C8',marginTop:3}}
                        title='Bussiness'
                        left={() => <List.Icon icon="car-sports" />}  
                    />

                    </List.Section>
                </View> 
}
