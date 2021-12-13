import React, {useEffect, useRef,useState} from 'react';
import {
    DrawerLayoutAndroid,
    StyleSheet,
    ScrollView,
    View
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
    Avatar,
    Button
} from 'native-base';



import MapView, { PROVIDER_GOOGLE,Marker  } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import GetLocation from 'react-native-get-location'

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
const drawerPosition = "right";

const Location = ({signOut,userState, authState, navigation,GoggleData}) => {

  const drawer = useRef(null);

    const [Places,setPlaces] = useState([])
    const [mlatitude,setmlatitude] = useState (37.78825)
    const [mlongitude,setmlongitude] =  useState(-122.4324)

    const fetchNearestPlacesFromGoogle = () => {

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            setmlatitude(location.latitude)
            setmlongitude(location.longitude)
            console.log(location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })

        // const latitude = 25.0756; // you can update it with user's latitude & Longitude
        // const longitude = 55.1454;
        // let radMetter = 2 * 1000; // Search withing 2 KM radius
    
        // const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key=' + "AIzaSyBp6n8Y1g70ofb4jg7Q6Zo9O_ecY5H3n0Y"
        
        // console.log(url)
        // fetch(url)
        //   .then(res => {
        //     return res.json()
        //   })
        //   .then(res => {
    
        //   var places = [] // This Array WIll contain locations received from google
        //     for(let googlePlace of res.results) {
        //       var place = {}
        //       var lat = googlePlace.geometry.location.lat;
        //       var lng = googlePlace.geometry.location.lng;
        //       var coordinate = {
        //         latitude: lat,
        //         longitude: lng,
        //       }
    
        //       var gallery = []
    
        //       if (googlePlace.photos) {
        //        for(let photo of googlePlace.photos) {
        //          var photoUrl = Urls.GooglePicBaseUrl + photo.photo_reference;
        //          gallery.push(photoUrl);
        //       }
        //     }
    
        //       place['placeTypes'] = googlePlace.types
        //       place['coordinate'] = coordinate
        //       place['placeId'] = googlePlace.place_id
        //       place['placeName'] = googlePlace.name
        //       place['gallery'] = gallery
    
        //       places.push(place);
        //     }
    
        //     console.log(places);
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
          
          const n = Math.floor(Math.random() * 20)
          console.log(n)
          var pl = [] 

          for(var i = 0; i < n; i++) {
            if(i/2 == 0) {
              pl.push({
                name:i,
                latitude : mlatitude + (Math.random() / 100) ,
                longitude : mlongitude + (Math.random() / 100) ,
              })
            } else {
              pl.push({
                name:i,
                latitude : mlatitude - (Math.random() / 100) ,
                longitude : mlongitude - (Math.random() / 100) ,
              })
            }
            console.log(pl[i])
          }
          setPlaces(pl)
        
      }

      useEffect(() => {

        const n = Math.floor(Math.random() * 20)
          console.log(n)
          var pl = [] 

          for(var i = 0; i < n; i++) {
            if(i/2 == 0) {
              pl.push({
                name:i,
                latitude : mlatitude + (Math.random() / 10000) ,
                longitude : mlongitude + (Math.random() / 10000) ,
              })
            } else {
              pl.push({
                name:i,
                latitude : mlatitude - (Math.random() / 10000) ,
                longitude : mlongitude - (Math.random() / 10000) ,
              })
            }
            console.log(pl[i])
          }
          setPlaces(pl)

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            setmlatitude(location.latitude)
            setmlongitude(location.longitude)
            console.log(location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })

        
    }, [])

    

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
        <Box style={{color:"black"}}>

            <Text bold color="black" textAlign='center' fontSize='4xl'>
                Naloxone Availablity
            </Text>

            <Button
            margin={5}
            onPress={() => {fetchNearestPlacesFromGoogle()}}
            >
            Refresh
            </Button>

            <Divider />

            <Box 
            style={{height:600,width:400,margin:3}}>
            
                <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: mlatitude,
                    longitude: mlongitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
                    <Marker 
                    coordinate={{
                    latitude: mlatitude,
                    longitude: mlongitude,
                    }}
                    image={require('../assets/OWN.png')}
                    title="Current Location"
                    description="Users Location"
                    >
                    </Marker>

                    <Marker 
                    coordinate={{
                    latitude: mlatitude+.005,
                    longitude: mlongitude+.007,
                    }}
                    image={require('../assets/medical.png')}
                    title="Current Location"
                    description="Naloxone Not Available Here"
                    >
                    </Marker>

                    {Places.map((da)=>(
                      <Marker 
                        key={da.name}
                        coordinate={{
                          latitude: da.latitude,
                          longitude: da.longitude,
                        }}
                      image={require('../assets/medical.png')}
                      title={"Medical Store"+ da.name}
                      description="Naloxone Available Here"
                      >
                      </Marker>
                    ))}
            
                </MapView>

            </Box>
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

Location.prototypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
  userState: propTypes.object.isRequired,
  GoggleData: propTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps )(Location)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f0ef',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      margin:10,
    },
    container2: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
});


