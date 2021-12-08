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

import Welcome from '../assets/Skull.png'


import { connect} from 'react-redux'
import propTypes from 'prop-types'
import {signOut,GoggleData} from '../action/auth'

import Icon3 from 'react-native-vector-icons/dist/FontAwesome'
import Fa from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/dist/AntDesign'
import Icon2 from 'react-native-vector-icons/dist/Entypo'

import EmptyContainer from '../componenets/EmptyContainer'

var Time = [87,61,77,95,50,75,50,80,68,66];
const MINUTE_MS = 1000;

const HomeScreen = ({signOut,userState, authState, navigation,GoggleData}) => {


    //Chart 1
    const [C1, setC1] = useState(Time)

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
    
    var width = Dimensions.get('window').width; 

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const Chart1 = (data1) => {
      return(
            <LineChart
              data={{
                      datasets: [{
                                    labels: ["|","|","|","|","|","|","|","|","|","|"],
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

    useEffect(() => {
      const interval = setInterval(() => {
        Time.shift();
        Time.push((Math.floor(Math.random() * 100) + 1) )
        const Arr = []
        for(var i = 0; i < Time.length; i++){
          Arr.push(Time[i])
        }
        setC1(Arr)
        Chart1(Time)
      }, MINUTE_MS);
    
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    // while(true){
    //     Time.shift();
    //     Time.push((Math.floor(Math.random() * 100) + 1) )
    //     console.log(Time)
    // }
    

    //Chart 1 End ////////////////////////////////

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
                  }
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
            <Pressable onPress={ ()=>{
                console.log("clicked"); 
                navigation.navigate('Profile')
            }}>
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
        <Box style={{margin:5}}>

            <Text bold color="black" textAlign='center' fontSize='4xl'>
                Home Content
            </Text>
            <Chart1/>

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

