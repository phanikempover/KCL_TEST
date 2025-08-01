import { useNavigate } from 'react-router-dom';

export const useNativeNavigation = () => {
  const navigate = useNavigate();

  return {
    navigate: (path) => {
      const AbsolutePath = path.startsWith('/');
      navigate(AbsolutePath ? path : '/' + path);
    },
    goBack: () => window.history.back(),
  }; 
};
