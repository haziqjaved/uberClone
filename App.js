import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/views/Login/Login';
import SignUp from './src/views/SignUp/SignUp';
import Dashboard from './src/views/Dashboard';
import Destination from './src/views/Destination';
import selectCar from './src/views/selectCar';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="LogIn"  component={Login}  />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name='Destination' component={Destination} />
      <Stack.Screen name='Cars' component={selectCar}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;