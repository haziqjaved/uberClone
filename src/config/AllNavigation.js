import React,{useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

import {
    Dashboard,
    Destination,
    Login,
    SignUp,
    CarSelection
    }  from '../views/index' 


export default function MainNavigation(){
    const [user,setUser]=useState(true)
    return (
        <NavigationContainer>
          {!user ?
            <AuthStack />
            :
            <DashboardStack />
          }
        </NavigationContainer>
      );
}
function AuthStack() {
    return <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  }
  
  function DashboardStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Destination" component={Destination} />
        <Stack.Screen name="CarSelection" component={CarSelection} />
      </Stack.Navigator>
    )
  }
