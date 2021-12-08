import React, {useState} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon  from 'react-native-elements'

import {NativeBaseProvider,
    Text,
    Box,
    Center,
    Input ,
    Button,
    Heading
} from 'native-base';

import CustomHeader from '../screens/CustomHeader';
import En from 'react-native-vector-icons/Entypo'
import Fa from 'react-native-vector-icons/FontAwesome'

import {connect} from 'react-redux'
import {signIn} from '../action/auth'
import {googleLogin} from '../action/auth'
import {GoogleSigninButton } from '@react-native-google-signin/google-signin';
import propTypes from 'prop-types'


const SignIn = ({ navigation,signIn,googleLogin}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const doSignIn = () => {signIn({email, password})}

    return (
        <>
        <CustomHeader/>
        <NativeBaseProvider >
            <ScrollView style={styles.container}>
            <Center flex={1} px="3">
                <Box>
                    <Text maxW="200" bold fontSize="xl" style={styles.Title} >Opioid Overdose Prediction System</Text>
                    <Heading style={{marginTop:5}} color="#750000" underline textAlign="center" size="md">LOGIN</Heading>
                </Box>
                <Box style={styles.formItem}>
                    <Input 
                    variant="rounded"
                    size="xl"
                    w="340"
                    placeholder="Enter your registered email"
                    value={email}
                    style={{color: 'black',textAlign: 'center'}}
                    onChangeText={(text) => setEmail(text)}>
                    </Input>
                </Box>
                <Box style={styles.formItem}>
                    <Input 
                    type={show ? "text" : "password"}
                    variant="rounded"
                    size="xl"
                    w="340"
                    placeholder="Enter your password"
                    value={password}
                    style={{color: 'black',textAlign: 'center'}}
                    onChangeText={(text) => setPassword(text)}

                    InputRightElement={
                        <En 
                        name= {show?"eye" : "eye-with-line"}
                        size={28} style={{color: "black"}} onPress={handleClick}/>
                        }>
                    </Input>
                 </Box>

                 <Button 
                    color='#f3a137'
                    block
                    style={{backgroundColor:'#f3a137',marginTop:15,width:200,borderRadius:10,alignSelf:'center'}}
                    onPress={doSignIn}>
                        <Text>SignIn</Text>
                </Button>
                
                <Text style={{marginTop:10}} color="#750000" >OR</Text>

                <Box > 
                    <GoogleSigninButton
                    style={{borderRadius:20,width:120}}
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Light}
                    onPress={() => googleLogin()}
                    />
                </Box>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    style={{marginTop: 10}}>
                    <Text style={{color: 'black', textAlign: 'center'}}>
                    Do not have an account, SignUp here
                    </Text>
                </TouchableOpacity>
            </Center>
            </ScrollView>
        </NativeBaseProvider>
        </>
      );
};


const mapDispatchToProps = {
    signIn: (data) => signIn(data),
    googleLogin: () => googleLogin()
}

SignIn.propTypes = {
    signIn: propTypes.func.isRequired,
    googleLogin : propTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
    container: {
      marginTop:-60,
      backgroundColor: '#f5f0ef',
      alignContent: 'center',
      textAlign: 'center'
    },
    heading: {
      textAlign: 'center',
      color: '#fdcb9e',
      marginHorizontal: 5,
      marginTop: 30,
    },
    formItem: {
      color:'black',
      margin:10,
    },
    Title:{
        color:'#000000',
        textAlign: 'center',
    }
});
  