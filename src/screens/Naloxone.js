import React, {useRef,useState} from 'react';
import {
    DrawerLayoutAndroid,
    StyleSheet,
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

import Welcome from '../assets/Skull.png'

import { connect} from 'react-redux'
import propTypes from 'prop-types'
import {signOut,GoggleData} from '../action/auth'

import Icon3 from 'react-native-vector-icons/dist/FontAwesome'
import Fa from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/dist/AntDesign'
import Icon2 from 'react-native-vector-icons/dist/Entypo'

import EmptyContainer from '../componenets/EmptyContainer'

const Naloxone= ({signOut,userState, authState, navigation,GoggleData}) => {

    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState("right");

    console.log("YEEEYE");
    console.log(userState);

    while(userState == null || userState.image == null)
    {
      return(
        <EmptyContainer/>
      )
    }

    const navigationView = () => (
      <NativeBaseProvider>
      <ScrollView>
      <VStack space="6" my="2" mx="1">
          <Center px='3'>
              <Image 
              source={Welcome} 
              size='xl'
              style={{left:-10}}
              resizeMode={'contain'}
              />
              <Text bold  fontSize='xl' color="black" textAlign='center'
                  style={{width:200}}>
              Opioid Overdose Prediction System
              </Text>
          </Center>
  
          <VStack divider={<Divider />} space="4"></VStack>
          
          <VStack space="3">
                <Pressable
                  px="5"
                  py="3"
                  rounded="md"
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
            </VStack>
  
            <VStack space="5">
            <Text fontWeight="500" fontSize="xl" px="5" color="gray.500">
              Labels
            </Text>
          <VStack space="3">
              <Pressable px="5" py="3">
                  <HStack space="7" alignItems="center">
                      <Icon3 name="user-circle" size={30} color="black" />
                      <Text color="gray.700" fontWeight="500" fontSize="md">
                          Family
                      </Text>
                  </HStack>
              </Pressable>
          
              <Pressable px="5" py="3">
                  <HStack space="7" alignItems="center">
                      <Icon3 name="user-circle" size={30} color="black" />
                      <Text color="gray.700" fontWeight="500" fontSize="md">
                          Family
                      </Text>
                  </HStack>
              </Pressable>
  
              <Pressable px="5" py="3" onPress={() => {
                signOut()
                }}>
                  <HStack space="7" alignItems="center">
                      <Icon name="logout" size={30} color="black" />
                      <Text color="gray.700" fontWeight="500" fontSize="md">
                          Log Out
                      </Text>
                  </HStack>
              </Pressable>

              <Pressable px="5" py="3" onPress={() => {
                GoggleData()
                }}>
                  <HStack space="7" alignItems="center">
                      <Icon name="logout" size={30} color="black" />
                      <Text color="gray.700" fontWeight="500" fontSize="md">
                          User Info
                      </Text>
                  </HStack>
              </Pressable>
          </VStack>
      </VStack>
      </VStack>
      </ScrollView>
      </NativeBaseProvider>
    );
    

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
        <Box style={{color:"black"}}>

            <Text bold color="black" textAlign='center' fontSize='4xl'>
                Naloxone Content
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

Naloxone.prototypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
  userState: propTypes.object.isRequired,
  GoggleData: propTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps )(Naloxone)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f0ef',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      margin:10,
    },
});

