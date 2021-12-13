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
    Avatar,
    FormControl,
    Input,
    Button
} from 'native-base';

import Snackbar from 'react-native-snackbar'
import ProgressBar from 'react-native-progress/Bar'

import database from '@react-native-firebase/database'

import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-picker'
import {options} from '../utils/options'

//redux
import { connect} from 'react-redux'
import propTypes from 'prop-types'
import {signOut,GoggleData} from '../action/auth'


import Icon3 from 'react-native-vector-icons/dist/FontAwesome'
import Fa from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/dist/AntDesign'
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Icon4 from 'react-native-vector-icons/dist/Fontisto'
import Icon5 from 'react-native-vector-icons/dist/Entypo'
import Fa2 from 'react-native-vector-icons/FontAwesome5'

import EmptyContainer from '../componenets/EmptyContainer'
const drawerPosition = "right";

const Profile = ({signOut,userState, authState, navigation,GoggleData}) => {

    const drawer = useRef(null);

    
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [Contact,setContact] = useState("");
    const [Address,setAddress] = useState("");
    const [Age,setAge] = useState("");

    while(userState == null || userState.image == null )
    {
      return(
        <EmptyContainer/>
      )
    }

    
    const [NFriends,setFriends] = useState(userState.Friends ? userState.Friends : []);
    

    const AddPariwar = async() => {

        console.log(name,email,Contact,Address,Age)
        console.log("AddPariwar")

        if(name == "" || email == "" || Contact == "" || Address == "" || Age == "")
        {
            Snackbar.show({
                text: "Please Fill All The Fields",
                textColor: "white",
                backgroundColor: "red"
            })
        }
        else
        {
            var Yell = []
            for(let i=0;i<NFriends.length;i++)
            {
                if(NFriends[i].Contact == Contact)
                {
                    console.log("NFriends[i].Name")
                    Snackbar.show({
                        text: "Contact Already Exists",
                        textColor: "white",
                        backgroundColor: "red"
                    })
                    return
                }
                Yell.push(NFriends[i])
            }
            Yell.push({
                Name: name,
                Email: email,
                Contact: Contact,
                Address: Address,
                Age: Age
            })           

            try{
                await database().ref('/users/' + userState.uid).update({
                    Friends: Yell
                  })
                  
                setFriends(Yell) 
                
                Snackbar.show({
                    text: "Member Added Successfully",
                    textColor: "white",
                    backgroundColor: "green"
                })
            }
            catch{
                Snackbar.show({
                    text: "Member Add Failed",
                    textColor: "white",
                    backgroundColor: "red"
                })
            }
        
        }
    }

    const handleRemove = async(cont) => {
        const newList = NFriends.filter((item) => item.Contact !== cont);
        

        try{
            await database().ref('/users/' + userState.uid).update({
                Friends: newList
              })
            setFriends(newList);
            
            Snackbar.show({
                text: "Member Removed Successfully",
                textColor: "white",
                backgroundColor: "green"
            })
        }
        catch{
            Snackbar.show({
                text: "Member Remove Failed",
                textColor: "white",
                backgroundColor: "red"
            })
        }
    
        
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
        <Box style={{color:"black"}}>

        <Center>
          <Divider my={2} />
            <Text bold color="black" textAlign='center' fontSize='4xl'>
                Friends List
            </Text>
          <Divider my={2} />
        {(NFriends.length==0)?(<Text bold color="black" textAlign='center' fontSize='xl'>NO member added yet</Text>):''   
        }

        {NFriends.map((da)=>(
            <Box
            marginBottom={2}
            borderWidth="1" borderColor="cyan.500" borderTopWidth="7" borderRadius="xl"
            width="90%" 
            flexDirection="row" >
                <Box margin={3}>
                    <Center>
                        <Image borderRadius='xl' marginBottom={1}
                        alt = {da.Name}
                        size ="md" source={{uri:'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name="'+da.Name+'"'}} />
                        <Button
                        onPress={()=>{handleRemove(da.Contact)}}  
                        width ="50%" size="xs" variant="outline" colorScheme="red">
                            Delete
                        </Button>
                    </Center>
                </Box>

                <Divider my={1} orientation="vertical" />

                <Box margin={3} width ="40%">
                    <HStack>
                        <Text bold color="black" textAlign='center' fontSize='md'>Name : </Text>
                        <Text bold color="black" textAlign='center' fontSize='md'>{da.Name}</Text>
                    </HStack>

                    <HStack>
                        <Text bold color="black" textAlign='center' fontSize='md'>Age : </Text>
                        <Text bold color="black" textAlign='center' fontSize='md'>{da.Age}</Text>
                    </HStack>
                    
                    <HStack>
                        <Text bold color="black" textAlign='center' fontSize='md'>Contact : </Text>
                        <Text bold color="black" textAlign='center' fontSize='md'>{da.Contact}</Text>
                    </HStack>

                    <HStack>
                        <Text bold color="black" textAlign='center' fontSize='md'>Email : </Text>
                        <Text bold color="black" textAlign='center' fontSize='md'>{da.Email}</Text>
                    </HStack>
                    
                    <HStack>
                        <Text bold color="black" textAlign='center' fontSize='md'>Address : </Text>
                        <Text bold color="black" textAlign='center' fontSize='md'>{da.Address}</Text>
                    </HStack>
            
                </Box>
            </Box>
        ))}
            
         
                <Divider my={2} />
                <Text bold color="black" textAlign='center' fontSize='xl'>
                    Add Friend
                </Text>
                
            <Box  
            marginBottom={2}
            borderWidth="1" borderColor="cyan.500" borderTopWidth="7" borderRadius="xl"
            width="90%" >
                <Box margin={3}>
                <Center>
                    <Input
                    onChangeText={(text)=>{setname(text)}}
                    size="xl"
                    InputLeftElement={<Icon4 name="person" style={{margin:10}} size={25}/>}
                    placeholder="Name"/>

                    <Input
                    onChangeText={(text)=>{setContact(text)}}
                    size="xl"
                    InputLeftElement={<Icon3 name="phone" style={{margin:10}} size={25}/>}
                    placeholder="Contact"/>

                    <Input
                    onChangeText={(text)=>{setemail(text)}}
                    size="xl"
                    InputLeftElement={<Icon2 name="email" style={{margin:10}} size={25}/>}
                    placeholder="Email"/>

                    <Input
                    onChangeText={(text)=>{setAge(text)}}
                    size="xl"
                    InputLeftElement={<Icon4 name="date" style={{margin:10}} size={25}/>}
                    placeholder="Age"/>

                    <Input
                    onChangeText={(text)=>{setAddress(text)}}
                    size="xl"
                    InputLeftElement={<Icon5 name="location" style={{margin:10}} size={25}/>}
                    placeholder="Address"/>
                

                    <Button 
                        margin={4}
                        onPress={()=>{
                            AddPariwar()
                    }}>

                    <Text>Add</Text>
                    </Button>
                </Center>
                </Box>
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

Profile.prototypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
  userState: propTypes.object.isRequired,
  GoggleData: propTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps )(Profile)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f0ef',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      margin:10,
    },
});

