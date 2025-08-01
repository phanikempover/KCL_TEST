
import {Image, Platform} from 'react-native';
import React from 'react';
import Home from './src/screens/Home';
import Login from './src/pages/Login';
import FlashScreen from './src/screens/FlashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Account from './src/screens/Account';
import UserIcon from './src/assets/images/userIcon.png';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#201f1fff',
          // borderTopColor: '#ccc',
          // borderTopWidth: 1,
        },
      }}>
      {/* <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: () => null,  
        }}
      /> */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: () => (
            <Image  source={UserIcon}  /> ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Flash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Flash" component={FlashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
