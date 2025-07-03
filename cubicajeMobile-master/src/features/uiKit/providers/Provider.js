import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

const Provider = ({children}) => {
  return (
    <PaperProvider>
      {children}
    </PaperProvider>
  );
}

export default Provider;