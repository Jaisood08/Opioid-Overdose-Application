import React from 'react';
import AuthStack from './AuthStack'
import store from './store'
import {Text} from 'react-native';

import {Provider} from 'react-redux'

const App = () => {
  return(
    <Provider store={store}>
      <AuthStack />
    </Provider>
  );
};

  
export default App;

