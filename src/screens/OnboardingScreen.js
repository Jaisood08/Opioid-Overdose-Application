import React from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';


const OnboardingScreen = ({ navigation }) => {
    return(
        <Onboarding
        onDone={() => navigation.navigate('Login')}
        onSkip={() => navigation.replace('Login')}
        pages={[
            {
            backgroundColor: '#b1dfdf',
            image: <Image source={require('../assets/1.jpg')} />,
            title: 'Opioids',
            subtitle: 'Opioids are a class of drugs that are pain relievers ,available legally by prescription, such as oxycodone (OxyContin®), hydrocodone (Vicodin®), codeine, morphine, and many others',
            },
            {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/2.jpg')} />,
            title: 'Opioid overdose',
            subtitle: 'Opioid use can lead to death due to the effects of opioids on the part of the brain which regulates breathing. An opioid overdose can be identified by a combination of three signs and symptoms:pinpoint pupils, unconsciousness and difficulties with breathing.',
            },
            {
            backgroundColor: '#f1f1f1',
            image: <Image source={require('../assets/3.gif')} 
                    style={{width: 400, height: 300}}
                    />,
            title: 'Watch Reading',
            subtitle: 'Monitor your health with our app. Simply connect Watch to your phone and start receiving alerts and notifications about your health.',
            },
        ]}
        />
    );
};

export default OnboardingScreen;
