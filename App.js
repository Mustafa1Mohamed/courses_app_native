import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './src/pages/login';
import Register from './src/pages/register';

import Courses from "./src/pages/Courses";
import Home from "./src/pages/Home";
import Favorites from "./src/pages/Favorites";
import CoursesDetails from "./src/pages/CoursesDetails";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (

    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Favorites" component={Favorites} />  
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login}  options={{headerShown: false}}/>
        <Stack.Screen name="register" component={Register} options={{headerShown: false}} />
<Stack.Screen name="Courses" component={Courses} />
  <Stack.Screen name="All Courses" component={MainDrawer}/>
      <Stack.Screen name="CoursesDetails" component={CoursesDetails} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3C467B",
    padding: 10,
  },
});

