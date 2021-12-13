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
    Button,
    VStack,
    Text,
    Center,
    Switch,
    Image,
    HStack,
    Divider,
    Avatar
} from 'native-base';

import Snackbar from 'react-native-snackbar'
import { connect} from 'react-redux'
import propTypes from 'prop-types'
import {signOut,GoggleData} from '../action/auth'
import cloneDeep from 'lodash/cloneDeep';

import Icon3 from 'react-native-vector-icons/dist/FontAwesome'
import Fa from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/dist/AntDesign'
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Fa2 from 'react-native-vector-icons/FontAwesome5'



import database from '@react-native-firebase/database'

import EmptyContainer from '../componenets/EmptyContainer'
const drawerPosition="right"

var Question=
[
  {
    id:1,
    text:"Do you frequently visit an endocrinologist?",
    answer:false,
  },
  {
    id:2,
    text:'Has your doctor prescribed you "Voltaren" or any prescription drug with an active ingredient called "Diclofenac"?',
    answer:false,
  },
  {
    id:3,
    text:'Has your doctor prescribed you any drug with an active ingredient called "Brimonidine Tartrate"?'
    ,answer:false,
  },
  
  {
    id:4,
    text:'If you have diabetes, do you use Insulin lispro injections called "Humalog"?'
    ,answer:false,
  },
  
  {
    id:5,
    text:'Has your doctor prescribed you any eye drops with an active ingredient called "Dorzolamide-Timolol"?'
    ,answer:false,
  },
  
  {
    id:6,
    text:'Has your doctor prescribed you any drug with an active ingredient called "Travoprost"?'
    ,answer:false,
  },
  
  {
    id:7,
    text:'Do you use the insulin solution called "lantus solostar"?'
    ,answer:false,
  },
  
  {
    id:8,
    text:'Do you use the insulin solution called "Levemir" or "Insulin detemir"?'
    ,answer:false,
  },
  
  {
    id:9,
    text:'Has your doctor prescribed you any eye drops with an active ingredient called "Latanoprost"?'
    ,answer:false,
  },
  
  {
    id:10,
    text:'Do you frequently visit a neurologist?'
    ,answer:false,
  },
  
  {
    id:11,
    text:'Has your doctor prescribed you "Restasis" or any prescription drug with an active ingredient called "Cyclosporine"?'
    ,answer:false,
  },
  
  {
    id:12,
    text:'Has your doctor prescribed you an eye drop with an active ingredient called "Timolol maleate"?'
    ,answer:false,
  },
  
  {
    id:13,
    text:'Do you use the insulin solution called "Novolog"?'
    ,answer:false,
  },
  
  {
    id:14,
    text:'Have you used any drug with "Morphine Sulphate" as a primary component?'
    ,answer:false,
  },
  
  {
    id:15,
    text:'Has your doctor prescribed you "Lumigan" or any prescription drug with an active ingredient called "Bimatoprost"?'
    ,answer:false,
  },
  
  {
    id:16,
    text:'Do you frequently visit an opthalmologist?'
    ,answer:false,
  },
  
  {
    id:17,
    text:'Has your doctor prescribed you "Lovoza" or any prescription drug with an active ingredient called "Omega-3 acid ethyl esters"?'
    ,answer:false,
  },
  
  {
    id:18,
    text:'Do you use the insulin solution called "Insulin aspart"?'
    ,answer:false,
  },
  {
    id:19,
    text:'Has your doctor prescribed you "Primidone"?'
    ,answer:false,
  },
  {
    id:20,
    text:'Are you taking Prescription for Alzheimer ?'
    ,answer:false,
  },
]
var Ans = Array(22).fill(0);

const Risk= ({signOut,userState, authState, navigation,GoggleData}) => {

    const drawer = useRef(null);

    const [Q, setQ] = useState(Ans)

    console.log("YEEEYE");
    console.log(userState);

    while(userState == null || userState.image == null)
    {
      return(
        <EmptyContainer/>
      )
    }

    const Submit = async() => {
      
      fetch('https://opioid-risk-prediction.herokuapp.com/Predict', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Ans)
      }).then((response) => response.json())
      .then((json) => {
          try{
               database().ref('/users/' + userState.uid).update({
                  Risk: json[1]
                })

              Snackbar.show({
                  text: "Successfull",
                  textColor: "white",
                  backgroundColor: "green"
              })

              try{
                navigation.navigate('Result')
              }
              catch(e){
                console.log(e);
              }
              
          }
          catch{
              Snackbar.show({
                  text: "Failed",
                  textColor: "white",
                  backgroundColor: "red"
              })
          }

        console.log(json);
      })
      .catch((error) => {
        Snackbar.show({
          text: "Failed",
          textColor: "white",
          backgroundColor: "red"
        })
        console.error(error);
      });

    }

    const Sub = () => {

      for(var i=0;i<Question.length;i++)
      {
        if(Question[i].answer)
        {
          Ans[i] = 1
        }
        else
        {
          Ans[i] = 0
        }
      }
      const Arr = cloneDeep(Ans);
      setQ(Arr) 
      console.log(Ans);
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
        <Box>
        <Center>
            <Text bold color="black" textAlign='center' fontSize='4xl'>
                Risk Assessment
            </Text>
            <Divider/>

            <Box
              marginBottom={2}
              borderWidth="2" borderColor="orange.200" borderTopWidth="10" borderRadius="lg"
              width="97%" 
            >

            {Question.map((da)=>(
              <Box
              key={da.id}
              margin={2}
              flexDirection="row" >
                  <Box  width={"10%"}>
                    <Text color="black"  fontSize='md'>
                        {"Q"+da.id}
                    </Text>
                  </Box>
                  <Box width={"80%"}>
                    <Text color="black"  fontSize='md'>
                      {da.text}
                    </Text>
                  </Box>
                  <Box
                  width={"10%"}>
                      <Switch
                        onToggle={() => {
                          if(da.answer == false){
                            da.answer = true
                          }else{
                            da.answer = false
                          }
                          console.log("Q "+da.id+" = "+ da.answer)
                          Sub()
                        }}
                        defaultIsChecked = {da.answer}
                        isChecked = {Q[da.id-1]}/>
                  </Box>
              </Box>
            ))}


            <Button
            size="lg"
            varient = "outline" 
            onPress={()=>{
              Submit()
              console.log("Result Page")
            }}>
              Predict
            </Button>

          </Box>
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

Risk.prototypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
  userState: propTypes.object.isRequired,
  GoggleData: propTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps )(Risk)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f0ef',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      margin:10,
    },
});

