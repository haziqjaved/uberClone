import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View,StyleSheet } from 'react-native';
import MainNavigation from './src/config/AllNavigation';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <MainNavigation />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: 300,
    height: 200
  }
});
