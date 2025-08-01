import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Image, useWindowDimensions } from 'react-native';
import { useNativeNavigation } from '../../NativeNavigation';
import FlashBGImg from '../assets/images/flashImage.png'
 
  

const FlashScreen = () => {
  const navigation = useNativeNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      //  navigation.navigate('Login');
      navigation.navigate('Main', { screen: 'Home' });
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={FlashBGImg} style={styles.image} resizeMode="cover"  />
    </View>
  );
};

export default FlashScreen;
 
const styles = StyleSheet.create({
  container: { 
     flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
    // width : 220,
    // height: 'auto'
  },
    image: {
    width: '100%',
    height: '100%',

  },
 
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
