import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import Login from './src/pages/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaView style={styles.safeArea}>
    //   <StatusBar barStyle="dark-content" />
    //     <Login/>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#ffa500',
  },
});

export default App;
