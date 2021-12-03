import React, {useState} from 'react'
import {StyleSheet, ScrollView, TouchableOpacity, View} from 'react-native'

import {
    NativeBaseProvider,
    Box,
    FormControl,
    Input,
    Text,
    Button,
    Avatar,
    Content
} from 'native-base'

import storage from '@react-native-firebase/storage'
import ProgressBar from 'react-native-progress/Bar'

import ImagePicker from 'react-native-image-picker'

const SignUp = ({signUp}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Contact, setInstaUserName] = useState('')
    const [country, setCountry] = useState('')
    const [bio, setBio] = useState('')
    const [Address, setAdd] = useState('')
    const [image, setImage] = useState('https://image.flaticon.com/icons/png/512/3011/3011270.png')
    const [imageUploading, setImageUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState(null)

    const chooseImage = async () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response)

            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                console.log(response)
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

            setImage(url)
            setImageUploading(false)
        })
    }

    return (
      <NativeBaseProvider>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>

        <TouchableOpacity style={{margin:10}} onPress={chooseImage}>
            <Avatar alignSelf="center" size ="xl" source={{uri: image}} />
        </TouchableOpacity>
        
        {imageUploading && (
          <ProgressBar progress={uploadStatus} style={styles.progress} />
        )}

        <FormControl style={{}}>
               
            <Input
              placeholder="Name"
              value={name}
              style={{margin:10, color: 'black',textAlign:'center'}}
              onChangeText={(text) => setName(text)}
            />

            <Input
              placeholder="Email"
              value={email}
              style={{margin:10, color: 'black',textAlign:'center'}}
              onChangeText={(text) => setEmail(text)}
            />
          
            <Input
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              style={{margin:10,color: 'black',textAlign:'center'}}
              onChangeText={(text) => setPassword(text)}
            />
          
            <Input
              placeholder="Contact Number"
              value={Contact}
              style={{margin:10,color: 'black',textAlign:'center'}}
              onChangeText={(text) => setInstaUserName(text)}
            />
                
            <Input
              placeholder="Your Short Bio"
              value={bio}
              style={{margin:10,color: 'black',textAlign:'center'}}
              onChangeText={(text) => setBio(text)}
            />
               
            <Input
              placeholder="country"
              value={country}
              style={{margin:10,color: 'black',textAlign:'center'}}
              onChangeText={(text) => setCountry(text)}
            />
                
                
            <Input
              placeholder="Address"
              value={Address}
              style={{margin:10,color: 'black',textAlign:'center'}}
              onChangeText={(text) => setAdd(text)}
            />
              
            <Button regular block
            style={{margin:10, backgroundColor:'#f3a137'}}>
              <Text>SignUp</Text>
            </Button>
                
            </FormControl>


      </ScrollView>
      </NativeBaseProvider>
      );
    
}

export default SignUp;



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f0ef',
      flex: 1,
      justifyContent: 'flex-start',
      margin:10,
      marginBottom:3,
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 5,
    },
    progress: {width: null, marginBottom: 20},
    formItem: {
      width: '80%',
      textAlign: 'center',
      marginBottom: 20,
    },
  });