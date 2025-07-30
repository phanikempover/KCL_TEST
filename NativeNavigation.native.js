import { useNavigation } from '@react-navigation/native';

export const useNativeNavigation = () => {
  const navigation = useNavigation();

  return {
    navigate: (screenName, params) => navigation.navigate(screenName, params),
    goBack: () => navigation.goBack(), 
  };
};
