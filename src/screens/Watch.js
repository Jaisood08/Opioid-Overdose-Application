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
    Input,
    Button,
    Avatar
} from 'native-base';

import Welcome from '../assets/Skull.png'

import { connect} from 'react-redux'
import propTypes from 'prop-types'
import {signOut,GoggleData} from '../action/auth'

import Icon3 from 'react-native-vector-icons/dist/FontAwesome'
import Fa from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/dist/AntDesign'
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Fa2 from 'react-native-vector-icons/FontAwesome5'

import EmptyContainer from '../componenets/EmptyContainer'
import { withSafeAreaInsets } from 'react-native-safe-area-context';
const drawerPosition="right"

const Watch= ({signOut,userState, authState, navigation,GoggleData}) => {

    const drawer = useRef(null);
    const [Ch,setCh] = useState(false)

    const WIFI = ()=>{
        for(var i =0;i<10000;i++){
            console.log('WIFI ',i)
        }
        navigation.navigate('Home')
    }
    

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
        <Center>
        <Text bold color="black" textAlign='center' fontSize='4xl'>
            Watch Connect
        </Text>
        
        <Divider />
        <Box alignItems="center" margin={10}>
            
            <Icon2 name="watch" size={200} color="black" style={{margin:20}}/>

            <Input
            width="90%"
            size="xl"
            InputLeftElement={
              <Icon3 name="wifi" color="black" size={20} style={{margin:6}}/>
            }
            placeholder="WiFi Name"
          />

          <Input
            width="90%"
            size="xl"
            InputLeftElement={
              <Icon2 name="onepassword" color="black" size={20} style={{margin:6}}/>
            }
            placeholder="Password"
          />
          
          <Button
          margin={6}
          onPress={() => {
            console.log('Pressed');
            setCh(true)
            WIFI()
          }}
          isLoading={Ch}
          _loading={{
            bg: "amber.400:alpha.70",
            _text: {
              color: "coolGray.700",
            },
          }}
          _spinner={{
            color: "white",
          }}
          isLoadingText="Submitting"
        >
          Button
        </Button>
          

        </Box>
        </Center>
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

Watch.prototypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
  userState: propTypes.object.isRequired,
  GoggleData: propTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps )(Watch)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f0ef',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      margin:10,
    },
});

