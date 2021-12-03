import React, { useContext, useEffect,useState } from 'react';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import Signup from '../screens/SignUp';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstTime, setIsFirstTime] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value =>{
        if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstTime(true);
        } else {
        setIsFirstTime(false);
        }
        });
  }, []);

  if(isFirstTime === null){return null;}
  else if(isFirstTime===true){ routeName = 'Onboarding'; }
  else { routeName = 'Login'; }

return (
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen 
            name="Onboarding"
            component={OnboardingScreen}
            options={{ header: () => null }}
        />
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ header: () => null }}
        />
        <Stack.Screen
            name="SignUp"
            component={Signup}
            options={{ header: () => null }}
        />
        </Stack.Navigator>
    );
  };
  
export default AuthStack;