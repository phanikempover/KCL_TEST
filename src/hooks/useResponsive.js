import { useWindowDimensions } from 'react-native';

export default function useResponsive() {
  const { width } = useWindowDimensions();

  if (width < 767) return 'mobile';  
  if (width < 1024) return 'tablet';  
  return 'web';  
}