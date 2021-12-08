import React, { useContext, useEffect,useState } from 'react';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/SignIn';
import Signup from './screens/SignUp';
import HomeScreen from './screens/Home';
import Profile from './screens/Profile';
import Naloxone from './screens/Naloxone';

import {SET_USER, IS_AUTHTHENTICATED} from './action/action.types'
import database from '@react-native-firebase/database'
import EmptyContainer from './componenets/EmptyContainer'
import {requestPermission} from './utils/AskPermission'
import {useDispatch, connect} from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage';




const Stack = createStackNavigator();

const AuthStack = ({authState}) => {

  //For Onboarding
  const [isFirstTime, setIsFirstTime] = useState(null);
  let routeName;

  //For Database Auth
  const dispatch = useDispatch();

  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: true
      })

    console.log(user._user.uid)

      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', (snapshot) => {
          console.log('USER DETAILS', snapshot.val())
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          })
        })


    } else {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: false
      })
    }
  }

  useEffect(() => {
    requestPermission()
    AsyncStorage.getItem('alreadyLaunched').then(value =>{
        if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstTime(true);
        } else {
        setIsFirstTime(false);
        }
        });

        GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/drive.readonly'], 
          webClientId: "285140180648-86gs7bqraedjtgkaaeg79ebqnneem2t2.apps.googleusercontent.com", 
          offlineAccess: true, 
          forceCodeForRefreshToken: true, 
          profileImageSize: 120, 
          });

      const susbcriber = auth().onAuthStateChanged(onAuthStateChanged)
      return susbcriber;
  }, []);

  if (authState.loading) {
      return(
        <EmptyContainer/>
      ) 
  }

  if(isFirstTime === null){return null;}
  else if(isFirstTime===true){ routeName = 'Onboarding'; }
  else { routeName = 'Login'; }
  if(authState.isAuthenticated) {routeName = 'Home';}


return (
  <>
  <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={routeName}
        screenOptions={{headerShown: false}}
        >
        {authState.isAuthenticated ? (
          <>
          <Stack.Screen
          name="Naloxone"
          component={Naloxone}
          />
          <Stack.Screen
              name="Home"
              component={HomeScreen}
          />
          <Stack.Screen
          name="Profile"
              component={Profile}
          />
          </>
        ) : (
          <>
          <Stack.Screen 
              name="Onboarding"
              component={OnboardingScreen}
          />
          <Stack.Screen
              name="Login"
              component={LoginScreen}
          />
          <Stack.Screen
              name="SignUp"
              component={Signup}
          />
          </>
        )}
        
        </Stack.Navigator>
    </NavigationContainer>
    </>
    );
  };

const mapStateToProps = (state) => ({
  authState: state.auth
})
  
export default connect(mapStateToProps)(AuthStack)