// App.js
import './global.css';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/LoginScreen';
import HomeTableScreen from './src/HomeTableScreen';
import HomeGridScreen from './src/HomeGridScreen';
import CreateAppScreen from './src/CreateAppScreen';
import HomeAdminScreen from './src/HomeAdminScreen';
import AppDetailScreen from './src/DetailScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,animation: 'fade'  }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeTable" component={HomeTableScreen} />
        <Stack.Screen name="HomeGrid" component={HomeGridScreen} />
        <Stack.Screen name="CreateApp" component={CreateAppScreen} />
        <Stack.Screen name="HomeAdmin" component={HomeAdminScreen} />
        <Stack.Screen name="AppDetail" component={AppDetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}