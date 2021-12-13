import React, {useRef,useState} from 'react';
import {
    DrawerLayoutAndroid,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';
import {
    NativeBaseProvider,
    Box,
    Pressable,
    Heading,
    VStack,
    Text,
    Center,
    Image,
    HStack,
    Divider,
    Avatar
} from 'native-base';

import {
  ProgressChart,
} from "react-native-chart-kit";


import {connect} from 'react-redux'
import propTypes from 'prop-types'
import {signOut,GoggleData} from '../action/auth'


import Icon3 from 'react-native-vector-icons/dist/FontAwesome'
import Fa from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Fa2 from 'react-native-vector-icons/FontAwesome5'


const drawerPosition="right"



const Result= ({signOut,userState, authState, navigation,GoggleData}) => {

    const widthAndHeight = 250
    const series = [123, 321]
    const sliceColor = ['#F44336','#2196F3']

    var width = Dimensions.get('window').width; 
    const chartConfig = {
      backgroundGradientFrom: "#f9d976",
      backgroundGradientFromOpacity: 0.6,
      backgroundGradientTo: "#f39f86",
      backgroundGradientToOpacity: 0.2,
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16
      },
    };
    
    const Chart1 = () => {

      const data = {
        labels:["Risk"], // optional
        data: [userState.Risk] 
      };

      return(
        <ProgressChart
        data={data}
        width={width}
        height={420}
        strokeWidth={26}
        radius={150}
        chartConfig={chartConfig}
        hideLegend={true}
        style={{
          marginVertical: 8,
          marginLeft:4,
          borderRadius: 16,
        }} 
      />
      )
    }

    const drawer = useRef(null);

    const navigationView = () => (
        <NativeBaseProvider>
        <ScrollView>
        <VStack space="6" my="2" mx="1">
            <Center px='3'>
                <Image 
                source={require('../assets/Skull.png')} 
                size='xl'
                alt='OPDS'
                style={{left:-10}}
                resizeMode={'contain'}
                />
                <Text bold  fontSize='xl' color="black" textAlign='center'
                    style={{width:200}}>
                Opioid Overdose Prediction System
                </Text>
            </Center>
    
            <Divider/>
            
            <VStack space="3">
                  <Pressable px="5" py="3"
                    onPress={() => {
                      drawer.current.closeDrawer()
                      navigation.navigate('Home')}
                    }
                   >
                    <HStack space="7" alignItems="center">
                      <Fa name="home" size={30} color="black" />
                      <Text
                        fontWeight="500"
                        fontSize="md"
                        color= 'gray.700'>
                        Home
                      </Text>
                    </HStack>
                  </Pressable>
            
                  <Pressable px="5" py="3"
                    onPress={() => {
                      drawer.current.closeDrawer()
                      navigation.navigate('Location')}
                    }
                   >
                    <HStack space="7" alignItems="center">
                      <Fa name="location-arrow" size={30} color="black" />
                      <Text
                        fontWeight="500"
                        fontSize="md"
                        color= 'gray.700'>
                        Buy Naloxone
                      </Text>
                    </HStack>
                  </Pressable>
              
                  <Pressable px="5" py="3"
                    onPress={() => {
                      drawer.current.closeDrawer()
                      navigation.navigate('Risk')}
                    }
                   >
                    <HStack space="7" alignItems="center">
                      <Fa name="linode" size={30} color="black" />
                      <Text
                        fontWeight="500"
                        fontSize="md"
                        color= 'gray.700'>
                        Risk Assessment
                      </Text>
                    </HStack>
                  </Pressable>
              </VStack>
            
    
              <VStack space="5">
              <Text fontWeight="500" fontSize="xl" px="5" color="gray.500">
                Watch
              </Text>
              
              <Pressable px="5" py="3" 
                onPress={() => {
                  drawer.current.closeDrawer()
                  navigation.navigate('Watch')}
                }>
                    <HStack space="7" alignItems="center">
                        <Icon2 name="watch" size={30} color="black" />
                        <Text color="gray.700" fontWeight="500" fontSize="md">
                            Watch
                        </Text>
                    </HStack>
                </Pressable>
              
              <Text fontWeight="500" fontSize="xl" px="5" color="gray.500">
                Profile
              </Text>
            <VStack space="3">
                <Pressable px="5" py="3" 
                onPress={() => {
                  drawer.current.closeDrawer()
                  navigation.navigate('Profile')}
                }>
                    <HStack space="7" alignItems="center">
                        <Fa2 name="user-tie" size={30} color="black" />
                        <Text color="gray.700" fontWeight="500" fontSize="md">
                            User
                        </Text>
                    </HStack>
                </Pressable>
            
                <Pressable px="5" py="3"
                onPress={() => {
                  drawer.current.closeDrawer()
                  navigation.navigate('Family')}
                }>
                    <HStack space="7" alignItems="center">
                        <Fa2 name="user-friends" size={30} color="black" />
                        <Text color="gray.700" fontWeight="500" fontSize="md">
                            Friends
                        </Text>
                    </HStack>
                </Pressable>
    
                <Pressable px="5" py="3" onPress={() => {
                  signOut()
                  }}>
                    <HStack space="7" alignItems="center">
                        <Icon3 name="sign-out" size={30} color="black" />
                        <Text color="gray.700" fontWeight="500" fontSize="md">
                            Log Out
                        </Text>
                    </HStack>
                </Pressable>
                <Divider />
  
                {userState.admin == true ?(
                  <>
                  <Text margin = {4} fontWeight="500" fontSize="xl" px="5" color="gray.500">
                    Debug - for admin only
                  </Text>
                  
                  <Pressable px="5" py="3" onPress={() => {
                    GoggleData()
                    }}>
                      <HStack space="7" alignItems="center">
                          <Icon3 name="user-secret" size={30} color="black" />
                          <Text color="gray.700" fontWeight="500" fontSize="md">
                              User Info
                          </Text>
                      </HStack>
                  </Pressable>
  
                  <Pressable px="5" py="3" onPress={() => {
                    drawer.current.closeDrawer()
                    navigation.navigate('Alert')
                    }}>
                      <HStack space="7" alignItems="center">
                          <Icon2 name="bell-alert" size={30} color="black" />
                          <Text color="gray.700" fontWeight="500" fontSize="md">
                              Alert
                          </Text>
                      </HStack>
                  </Pressable>
                  </>
                ):(<Divider />)}
                
            </VStack>
        </VStack>
        </VStack>
        </ScrollView>
        </NativeBaseProvider>
      );
    
      const d1 = [{y:10,x:'20%'},{y:90,x:'80%'}]

    return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
      >
      <ScrollView>
      <NativeBaseProvider>
        <Box style={styles.container}>
            <Pressable onPress={navigation.navigate('Profile')}>
            <Box style={{flexDirection:"row"}}>
                <Avatar size ="md" source={{uri:userState.image}} />
                <Text bold color="black" textAlign='center'
                  style={{fontSize:17 ,margin:13}} >{userState.name}</Text>
            </Box>
            </Pressable>
            <Box>
            <Fa name="bars" size={40} color="red" onPress ={()=>drawer.current.openDrawer()}/>
            </Box>
        </Box>
        <Box>
            <Text bold color="black" textAlign='center' fontSize='4xl'>
                Result
            </Text>

            <Divider />

            <Chart1/>

            <Text bold color="#2C3A47" textAlign='center' fontSize='lg'>
            Predicted Opioid Risk Assessment 
            </Text>
    
    
            <Text
            bold fontSize='xl' color='#2C3A47' textAlign='center'>
            {(userState.Risk*100).toFixed(4)}%
            </Text>
      
        </Box>
      </NativeBaseProvider>  
      </ScrollView>
      </DrawerLayoutAndroid>
    );
};

const mapStateToProps = (state) => ({
  authState: state.auth,
  userState: state.auth.user,
})

const mapDispatchToProps = {
  signOut,
  GoggleData
}

Result.prototypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
  userState: propTypes.object.isRequired,
  GoggleData: propTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps )(Result)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f0ef',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      margin:10,
    },
});

