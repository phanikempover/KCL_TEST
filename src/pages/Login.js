// import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native'; 
import { useNativeNavigation } from '../../NativeNavigation';
import useResponsive from '../hooks/useResponsive';
 
const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); 
  const navigation = useNativeNavigation();
    const deviceType = useResponsive();
 
 
  const handleLogin = () => { 
    if (Platform.OS === 'web') {
      navigation.navigate('Home');
    } else navigation.navigate('Main', { screen: 'Home' });
  
  };
  

  return (
  

        <View style={styles.wrapper}>
          {Platform.OS === 'web' && deviceType !== 'mobile' && (
            <View style={styles.imageContainer}>
              
              <Text style={styles.title}>Thllo</Text>
            </View>
          )}

          <View style={styles.formContainer}>
            <View style={styles.box}>
              <Text style={styles.title}>Log In</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <View style={styles.button}>
                <Button title="Log In" onPress={handleLogin} />
              </View>
            </View>
          </View>
        </View>
    
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffa500',
  },
  container: {
    flex: 1,
    // backgroundColor: '#ffa500',
  },
  wrapper: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: '#ffa500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === 'web' ? 50 : 20,
  },
  box: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#f9f9f9',
    padding: 24,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 32 : 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    marginTop: 10,
  },
});

export default Login;
