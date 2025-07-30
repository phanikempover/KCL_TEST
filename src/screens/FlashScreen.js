import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { useNativeNavigation } from '../../NativeNavigation';
import FlashBGImg from '../assets/images/red-background.png'
 
  

const FlashScreen = () => {
  const navigation = useNativeNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
       navigation.navigate('Login');
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={FlashBGImg} />
    </View>
  );
};

export default FlashScreen;

const styles = StyleSheet.create({
  container: { 
     
    alignItems: 'center',
    justifyContent: 'center',
    width : 'full',
    height: 'auto'
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
