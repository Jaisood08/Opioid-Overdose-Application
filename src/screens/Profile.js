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

import EmptyContainer from '../componenets/EmptyContainer'

const Profile = ({signOut,userState, authState, navigation,GoggleData}) => {

    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState("right");

    const [name,setname] = useState(userState.name);
    const email = userState.email;
    const [Contact,setContact] = useState(userState.Contact);
    const [Address,setAddress] = useState(userState.Address);
    const [Country,setCountry] = useState(userState.Country);
    const [Bio,setBio] = useState(userState.Bio);
    const [image,setimage] = useState(userState.image);
    const [Age,setAge] = useState(userState.Age);


    
    const [imageUploading, setImageUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState(null)


    const chooseImage = async () => {
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                uploadImage(response)
              }
             
               
        })
    }


    const uploadImage = async (response) => {
        setImageUploading(true)
        const reference = storage().ref(response.fileName)

        const task = reference.putFile(response.path)
        task.on('state_changed', (taskSnapshot) => {
            const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000

            setUploadStatus(percentage)
        })

        task.then(async () => {
            const url = await reference.getDownloadURL()

            setimage(url)
            setImageUploading(false)
            console.log(url)
        })
    }

    const Update = async () => {

      console.log(name,Age,email,Contact,Address,Country,Bio,image);

      try{
        await database().ref('/users/' + userState.uid).update({
          name,
          Age,
          Contact,
          email,
          Address,
          Country,
          Bio,
          image
        })

        Snackbar.show({
            text:  'Profile Updated',
            textColor: "white",
            backgroundColor: 'green',
        })

      }
      catch(error){
        console.log(error);
        Snackbar.show({
          text: "Information Update Failed",
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
              Profile
            </Text>
          <VStack space="3">
              <Pressable px="5" py="3" 
              onPress={() => {
                drawer.current.closeDrawer()
                navigation.navigate('Profile')}
              }>
                  <HStack space="7" alignItems="center">
                      <Icon3 name="user-circle" size={30} color="black" />
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
        <Box style={{color:"black"}}>
          <Divider my={2} />
            <Text bold color="black" textAlign='center' fontSize='4xl'>
                User Profile
            </Text>
          <Divider my={2} />
          <FormControl>
          <Box flexDirection="row">
            <Box>
              <Pressable onPress={chooseImage}>
              <Image marginLeft={1} marginRight={3} size ="xl" borderRadius={16} source={{uri:userState.image}} />  
              </Pressable>
              {imageUploading && ( <ProgressBar progress={uploadStatus} style={styles.progress} />)}
            </Box>
            <Divider my={1} orientation="vertical" />
            <Box style={{marginLeft:13}}>
              <HStack>
                <Text marginTop={2} bold fontSize='xl'>Name : </Text>
                <Input w={"58%"} fontSize="xl" variant="underlined" placeholder={userState.name} 
                onChangeText={(text) => setname(text)} />
              </HStack>
              <HStack>
                <Text marginTop={2} bold fontSize='xl'>Age : </Text>
                <Input w={"58%"} fontSize="xl" variant="underlined" placeholder={userState.Age ? userState.Age:''} 
                onChangeText={(text) => setAge(text)}/>
              </HStack>
              <HStack>
                <Text marginTop={2} bold fontSize='xl'>Contact : </Text>
                <Input w={"58%"} fontSize="xl" variant="underlined" placeholder={userState.Contact? userState.Contact:''}
                onChangeText={(text) => setContact(text)} />
              </HStack>
            </Box>
          </Box>
          <Box margin={5}>

            <HStack>
                <Text bold fontSize='xl'>Email : </Text>
                <Text fontSize="xl">{userState.email? userState.email:''}</Text>
            </HStack>

            <HStack>
                <Text marginTop={2} bold fontSize='xl'>Address : </Text>
                <Input w={"80%"} fontSize="xl" variant="underlined" placeholder={userState.Address? userState.Address:''} 
                onChangeText={(text) => setAddress(text)} />
            </HStack>

            <HStack>
                <Text marginTop={2} bold fontSize='xl'>Country : </Text>
                <Input w={"80%"} fontSize="xl" variant="underlined" placeholder={userState.country? userState.country:''}
                onChangeText={(text) => setCountry(text)} />
            </HStack>

            <HStack>
                <Text marginTop={2} bold fontSize='xl'>Bio : </Text>
                <Input w={"80%"} fontSize="xl" variant="underlined" placeholder={userState.bio? userState.bio:''}
                onChangeText={(text) => setBio(text)}  />
            </HStack>

            <HStack>
                <Text marginTop={2} bold fontSize='xl'>Risk : </Text>
                <Text fontSize="xl" variant="underlined" >{userState.Risk? userState.Risk:''}</Text>
            </HStack>

            <Button 
              color='#f3a137'
              block
              size="lg"
              onPress={Update}
              style={{backgroundColor:'#f3a137',marginTop:15,width:200,borderRadius:10,alignSelf:'center'}}
             > 
             <HStack >
              <Icon2 name="update" size={20}/>
              <Text bold > Update</Text>
             </HStack>
            </Button>

          </Box>
          </FormControl>


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

