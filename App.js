import { Platform } from 'react-native';
import AppNative from './App.native';
import AppWeb from './App.web';

export default Platform.OS === 'web' ? AppWeb : AppNative;