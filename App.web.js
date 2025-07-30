// import React, {useState} from 'react';
// import {StyleSheet, SafeAreaView, StatusBar, Text} from 'react-native';
// import Login from './src/pages/Login';
// // import {NavigationContainer} from '@react-navigation/native';
// // import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home from './src/screens/Home';

// const App = () => {
//   // const Stack = createNativeStackNavigator();

//   return (
//     // <NavigationContainer>
//     //   <Stack.Navigator initialRouteName="Login">
//     //     <Stack.Screen name="Login" component={Login} />
//     //     <Stack.Screen name="Home" component={Home} />
//     //   </Stack.Navigator>
//     // </NavigationContainer>
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" />
//         <Login/> 
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     // backgroundColor: '#ffa500',
//   },
// });

// export default App;


import { Platform } from 'react-native';
import React from 'react';
import Home from './src/screens/Home';
import Login from './src/pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlashScreen from './src/screens/FlashScreen';

export default function App() {
  
    return (
      <Router>
        <Routes>
           
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    ); 
}
