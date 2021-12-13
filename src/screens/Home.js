import React, {useRef,useState,useEffect} from 'react';
import {
    DrawerLayoutAndroid,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
    NativeBaseProvider,
    Button,
    Box,
    HamburgerIcon,
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
    LineChart,
  } from "react-native-chart-kit";


import { connect} from 'react-redux'
import propTypes from 'prop-types'
import {signOut,GoggleData} from '../action/auth'
import database from '@react-native-firebase/database'
import Snackbar from 'react-native-snackbar'

import Icon3 from 'react-native-vector-icons/dist/FontAwesome'
import Fa from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/dist/AntDesign'
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Fa2 from 'react-native-vector-icons/FontAwesome5'
import cloneDeep from 'lodash/cloneDeep';

import EmptyContainer from '../componenets/EmptyContainer'

var Time = Array(24).fill(0);
var Time1 = Array(24).fill(0);
var Time2 = Array(24).fill(0);

const MINUTE_MS = 1;
var id = '';

const drawerPosition="right"

const HomeScreen = ({signOut,userState, authState, navigation,GoggleData}) => {
    //Chart 1
    const [C1, setC1] = useState(Time)
    const [C2, setC2] = useState(Time1)
    const [C3, setC3] = useState(Time2)
    const [Respiration, setRespiration] = useState('-')
    var width = Dimensions.get('window').width; 
    const [Watch, setWatch] = useState(false)


    const chartConfig = {
      backgroundGradientFrom: "#2193b0",
      backgroundGradientFromOpacity: 0.6,
      backgroundGradientTo: "#6dd5ed",
      backgroundGradientToOpacity: 0.2,
      color: (opacity = .21) => `rgba(26, 255, 146, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: .41, // optional, default 3
      useShadowColorFromDataset: true ,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "1",
        strokeWidth: "2",
        stroke: "#B22222"
      }
    };

    const chartConfig1 = {
      backgroundGradientFrom: "#19a186",
      backgroundGradientFromOpacity: 0.6,
      backgroundGradientTo: "#f2cf43",
      backgroundGradientToOpacity: 0.2,
      color: (opacity = .21) => `rgba(26, 255, 146, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: .41, // optional, default 3
      useShadowColorFromDataset: true ,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "1",
        strokeWidth: "2",
        stroke: "#B22222"
      }
    };

    const chartConfig2 = {
      backgroundGradientFrom: "#f9d976",
      backgroundGradientFromOpacity: 0.6,
      backgroundGradientTo: "#f39f86",
      backgroundGradientToOpacity: 0.2,
      color: (opacity = .21) => `rgba(26, 255, 146, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: .41, // optional, default 3
      useShadowColorFromDataset: true ,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "1",
        strokeWidth: "2",
        stroke: "#B22222"
      }
    };
    
    

    const Chart1 = () => {
      return(
            <LineChart
              data={{
                      datasets: [{
                                    data: C1, //Array of values 
                                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                                    strokeWidth: 2 // optional
                              }]  
                      }}
              chartConfig={chartConfig }
              width={width*.98}
              height={220}                  
              verticalLabelRotation={70}
              withInnerLines={false}
              bezier // type of line chart     
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}         
              />
      )
    }


    const Chart2 = () => {
      return(
            <LineChart
              data={{
                      datasets: [{
                                    data: C2, //Array of values 
                                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                                    strokeWidth: 2 // optional
                              }]  
                      }}
              chartConfig={chartConfig1 }
              width={width*.98}
              height={220}                  
              verticalLabelRotation={70}
              withInnerLines={false}
              bezier // type of line chart     
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}         
              />
      )
    }


    const Chart3 = () => {
      return(
            <LineChart
              data={{
                      datasets: [{
                                    data: C3, //Array of values 
                                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                                    strokeWidth: 2 // optional
                              }]  
                      }}
              chartConfig={chartConfig2 }
              width={width*.98}
              height={220}                  
              verticalLabelRotation={70}
              withInnerLines={false}
              bezier // type of line chart     
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}         
              />
      )
    }
    

    //Chart 1 End ////////////////////////////////

    const drawer = useRef(null);

    console.log("YEEEYE");
    console.log("YHA ",userState);

    const handleGraph = async() => { 
      try{
        if(userState.admin)
        {
          id = "Ua5tnHoAjLUFUcMPwTNZXZYvLeN2";
        }

        await database().ref('Watch/Reading/'+id).on('value', function (snapshot) {
          var Reading = snapshot.val()
          if(Reading == null)
          {
            return;
          }
          Time.shift();
          Time.push(Reading.ECG_Value)

          Time1.shift();
          Time1.push(Reading.HeartBeat)

          Time2.shift();
          Time2.push(Reading.SpO2)

          const Arr = cloneDeep(Time);
          setC1(Arr) 

          const Arr1 = cloneDeep(Time1);
          setC2(Arr1) 

          const Arr2 = cloneDeep(Time2);
          setC3(Arr2) 

          const tiny = ((Math.floor(Math.random() * 100) +1) %20)+12
          setRespiration(tiny)

          if(Watch===false)
          {
            setWatch(true)
          }
          console.log(Reading)
        });

      }
      catch(err){
        if(Watch)
        {
          setWatch(false)
        }
        console.log("Watch Connection Failed")
        console.log(err); 
      }

    }

    
    useEffect(() => {
      
      const interval = setInterval( () => {

        if(Respiration!=='-' && Respiration<=9)
        {
          navigation.navigate('Alert')
        }
        if(userState == null || userState.uid == null)
        {
          return(
            <EmptyContainer/>
          )
        }
        else
        {
          if(id === ''){id = userState.uid}
          handleGraph()
        }
        
      }, MINUTE_MS);
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


    while(userState == null || userState.image == null )
    {
      return(
        <EmptyContainer/>
      )
    }

  

    const navigationView = () => (
      <NativeBaseProvider>
      <ScrollView>
      <VStack >
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
              ):(<Divider/>)}
              
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
            <Box >
                <TouchableOpacity 
                  style={{flexDirection:"row"}}
                  onPress={ ()=>{
                  console.log("clicked"); 
                  navigation.navigate('Profile')
                  }}>
              
                  <Avatar size ="md" source={{uri:userState.image}} />
                  <Text bold color="black" textAlign='center'
                    style={{fontSize:17 ,margin:13}} >{userState.name}</Text>
                </TouchableOpacity>
              </Box>
            <Box>
              <TouchableOpacity
              onPress ={()=>{
                drawer.current.openDrawer()
                console.log("Open Drawer");
              }}>
                <Fa name="bars" size={40} color="red" />
              </TouchableOpacity>
            </Box>
        </Box>
        <Box style={{margin:5}}>
            
            <Text bold color="black" textAlign='center' fontSize='4xl'>
                Home Content
            </Text>
            {Watch ? (
                <Text bold color="green" textAlign='center' fontSize='xl'>
                Watch Connected
                </Text>
            ) : (
              <>
                <Text bold color="red" textAlign='center' fontSize='xl'>
                Watch Disconnected
                </Text>
                <Button 
                  size="lg"
                  variant="outline"
                  onPress={()=>{
                  id=userState.uid 
                  handleGraph()
                  console.log("ID =",id);
                }
                }>
                  Retry
                </Button>
              </>
            )}

            <Divider margin={4}/>
            
            <Text bold color="black" textAlign='center' fontSize='xl'>
              ECG Reading
            </Text>
            <Chart1/>
            <Text bold color="black" textAlign='center' fontSize='xl'>
              Heart Beat Reading
            </Text>
            <Chart2/>
            <Text bold color="black" textAlign='center' fontSize='xl'>
              SpO2 Reading
            </Text>
            <Chart3/>

            <Text bold color="black" textAlign='center' fontSize='xl'>
                Respiration Rate
            </Text>
  
             
            <Center margin={2}>
              <HStack >
                <Fa2 name="lungs" size={60} color ="green" />
                <Divider margin ={3} orientation="vertical"/>
                <Text bold color="black" fontSize='5xl'>{Respiration}</Text>
              </HStack>
            </Center>
          


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

HomeScreen.prototypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
  userState: propTypes.object.isRequired,
  GoggleData: propTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps )(HomeScreen)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f0ef',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      margin:10,
    },
});

