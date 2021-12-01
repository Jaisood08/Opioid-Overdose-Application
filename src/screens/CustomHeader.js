import React from 'react'
import {StyleSheet,View,Text, Image} from 'react-native'


import Welcome from '../assets/Skull.png';

import WavyHeader from '../componenets/WavyHeader';


const CustomHeader = ({navigation}) => {

    return(
        <>
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <WavyHeader customStyles={styles.svgCurve} />
                </View>
        
        <Image
            source={Welcome}
            style={{width: null, height: 150, top: -229,left: -20}}
            resizeMode="contain"
        />
        </View>
        </>
    )
};


export default CustomHeader;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f0ef',
    },
    headerContainer: {
      marginTop: 0,
    },
    svgCurve: {
        height: 370,
        top: -100 ,
        left: -9
    },
  });