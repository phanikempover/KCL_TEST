import { useNavigate } from 'react-router-dom';

export const useNativeNavigation = () => {
  const navigate = useNavigate();

  return {
    navigate: (path) => navigate(path),
    goBack: () => window.history.back(), 
  };
};
